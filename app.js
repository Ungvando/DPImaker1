import { ALL_ITEMS, DEFAULT_ALIASES } from "./aliases.js";
import { buildPdf, downloadPdf } from "./renderer.js";
import { ALWAYS_HIGHLIGHT, DEMO_TEMPLATES } from "./templates.js";
import { extractEntries, matchTools } from "./parser.js";
import * as pdfjsLib from "./pdfjs/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = "./pdfjs/pdf.worker.min.mjs";

const $ = id => document.getElementById(id);
let entries = []; // {products, stepsText, treeNut, demoKit, tools:Set, include:bool}

// ---------- aliases (defaults + user additions from chrome.storage) ----------
let userAliases = {};
async function loadUserAliases() {
  const data = await chrome.storage.local.get("userAliases");
  userAliases = data.userAliases || {};
}
function mergedAliases() {
  return { ...DEFAULT_ALIASES, ...userAliases };
}

// ---------- PDF -> text ----------
async function pdfToText(file) {
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  let text = "";
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const tc = await page.getTextContent();
    let line = "", lastY = null;
    for (const it of tc.items) {
      const y = it.transform[5];
      if (lastY !== null && Math.abs(y - lastY) > 2) {
        text += line.trimEnd() + "\n";
        line = "";
      }
      line += it.str + (it.hasEOL ? "\n" : " ");
      lastY = y;
    }
    text += line.trimEnd() + "\n";
  }
  return text;
}

// ---------- review UI ----------
function renderReview() {
  const list = $("entryList");
  list.innerHTML = "";
  const aliases = mergedAliases();

  entries.forEach((e) => {
    const matchedSet = new Set(matchTools(e.stepsText, aliases, e));
    const templateSet = new Set(e.template ? DEMO_TEMPLATES[e.template] || [] : []);
    const defaultSet = new Set(ALWAYS_HIGHLIGHT);

    const div = document.createElement("div");
    div.className = "entry" + (e.include ? "" : " skipped");

    const head = document.createElement("div");
    head.className = "entry-head";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = e.include;
    cb.addEventListener("click", ev => ev.stopPropagation());
    cb.addEventListener("change", () => { e.include = cb.checked; renderReview(); });
    const title = document.createElement("div");
    title.className = "entry-title";
    title.innerHTML = e.products.map(p => {
      const m = p.match(/^(\d+)\s*-\s*(.*)$/);
      return m ? `<span class="item-no">${m[1]}</span> ${escapeHtml(m[2])}` : escapeHtml(p);
    }).join("<br>");
    head.append(cb, title);
    if (e.treeNut) {
      const b = document.createElement("span");
      b.className = "badge";
      b.textContent = "Tree Nut";
      head.append(b);
    }
    head.addEventListener("click", () => { e.include = !e.include; renderReview(); });
    div.append(head);

    const body = document.createElement("div");
    body.className = "entry-body";

    const chips = document.createElement("div");
    chips.className = "chips";
    [...e.tools].sort().forEach(t => {
      const chip = document.createElement("span");
      let cls = "chip";
      if (templateSet.has(t) && !matchedSet.has(t)) cls += " template";
      else if (defaultSet.has(t) && !matchedSet.has(t)) cls += " default";
      chip.className = cls;
      chip.append(document.createTextNode(t));
      const x = document.createElement("button");
      x.textContent = "\u2715";
      x.title = "Remove " + t;
      x.addEventListener("click", () => { e.tools.delete(t); renderReview(); });
      chip.append(x);
      chips.append(chip);
    });
    body.append(chips);

    const controls = document.createElement("div");
    controls.className = "entry-controls";

    const tmpl = document.createElement("select");
    tmpl.className = "tmplSel";
    tmpl.innerHTML = "<option value=''>Demo template\u2026</option>" +
      Object.keys(DEMO_TEMPLATES).map(t =>
        `<option${e.template === t ? " selected" : ""}>${t}</option>`).join("");
    tmpl.addEventListener("change", () => {
      if (e.template && DEMO_TEMPLATES[e.template]) {
        for (const it of DEMO_TEMPLATES[e.template]) e.tools.delete(it);
        for (const it of matchedSet) e.tools.add(it);
        for (const it of ALWAYS_HIGHLIGHT) e.tools.add(it);
      }
      e.template = tmpl.value;
      if (e.template) for (const it of DEMO_TEMPLATES[e.template] || []) e.tools.add(it);
      renderReview();
    });
    controls.append(tmpl);

    const add = document.createElement("select");
    add.className = "addTool";
    add.innerHTML = "<option value=''>Add a tool\u2026</option>" +
      ALL_ITEMS.filter(it => !e.tools.has(it)).map(it => `<option>${it}</option>`).join("");
    add.addEventListener("change", () => {
      if (add.value) { e.tools.add(add.value); renderReview(); }
    });
    controls.append(add);

    body.append(controls);
    div.append(body);
    list.append(div);
  });

  const count = entries.filter(e => e.include).length;
  $("pageCount").textContent = count
    ? `${count} sheet${count === 1 ? "" : "s"} selected \u2192 ${Math.ceil(count / 2)} printed page${count > 2 ? "s" : ""}`
    : "No sheets selected";
  $("actionBar").hidden = false;
  $("printBtn").disabled = count === 0;
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---------- file handling ----------
async function handleFile(file) {
  if (!file) return;
  $("status").textContent = "Reading " + file.name + " …";
  try {
    const text = await pdfToText(file);
    const raw = extractEntries(text);
    const aliases = mergedAliases();
    entries = raw.map(e => {
      const matched = matchTools(e.stepsText, aliases, e);
      return {
        ...e,
        tools: new Set([...matched, ...ALWAYS_HIGHLIGHT]),
        matchedCount: matched.length,
        template: "",
        include: matched.length > 0
      };
    });

    $("status").textContent = entries.length
      ? `${file.name} — ${entries.length} product${entries.length === 1 ? "" : "s"} with prep instructions. Drop a different PDF to start over.`
      : "No Preparation Instructions found in that PDF. Check it is the daily DPI export.";
    $("reviewSection").hidden = entries.length === 0;
    renderReview();
  } catch (err) {
    console.error(err);
    $("status").textContent = "Could not read that PDF: " + err.message;
  }
}

// ---------- events ----------
$("fileInput").addEventListener("change", e => handleFile(e.target.files[0]));

const dz = $("dropzone");
dz.addEventListener("dragover", e => { e.preventDefault(); dz.classList.add("dragover"); });
dz.addEventListener("dragleave", () => dz.classList.remove("dragover"));
dz.addEventListener("drop", e => {
  e.preventDefault();
  dz.classList.remove("dragover");
  handleFile(e.dataTransfer.files[0]);
});

$("printBtn").addEventListener("click", async () => {
  const included = entries.filter(e => e.include);
  if (!included.length) return;
  $("printBtn").disabled = true;
  $("printBtn").textContent = "Building PDF…";
  try {
    const bytes = await buildPdf(included);
    const date = new Date().toISOString().slice(0, 10);
    downloadPdf(bytes, `PrepSheets_${date}.pdf`);
  } catch (err) {
    console.error(err);
    alert("Could not build PDF: " + err.message);
  } finally {
    $("printBtn").disabled = false;
    $("printBtn").textContent = "Save Prep Sheets PDF";
  }
});

// settings dialog
$("settingsBtn").addEventListener("click", async () => {
  await loadUserAliases();
  $("aliasBox").value = Object.entries(userAliases)
    .map(([k, v]) => `${k} => ${v}`).join("\n");
  $("settingsDialog").showModal();
});
$("closeSettings").addEventListener("click", () => $("settingsDialog").close());
$("saveAliases").addEventListener("click", async () => {
  const map = {};
  const bad = [];
  for (const line of $("aliasBox").value.split("\n")) {
    if (!line.trim()) continue;
    const m = line.split("=>");
    if (m.length !== 2) { bad.push(line); continue; }
    const phrase = m[0].trim().toLowerCase();
    const item = m[1].trim().toUpperCase();
    if (!ALL_ITEMS.includes(item)) { bad.push(line + "  (unknown sheet item)"); continue; }
    map[phrase] = item;
  }
  if (bad.length) {
    alert("These lines were not saved:\n" + bad.join("\n"));
  }
  userAliases = map;
  await chrome.storage.local.set({ userAliases: map });
  $("settingsDialog").close();
});

loadUserAliases();
