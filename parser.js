// Parsing logic: split the DPI text into entries, extract product names,
// isolate the numbered prep steps, and match tools via the alias dictionary.

const MARKER = /Preparation Instructions:/g;

const STOP_HEADERS = [
  "item description:", "key selling points:", "em demo requirements",
  "notes:", "demo kit", "cart set up", "training", "dress code",
  "purchase", "photo split", "vendor:", "intro:", "kit instructions",
  "setup instructions", "what you'll need", "product display",
  "item number(s)", "closing strategies", "vendor demo/roadshow",
  "add-on services", "ask for the sale"
];

export function extractEntries(fullText) {
  const idxs = [];
  let m;
  while ((m = MARKER.exec(fullText)) !== null) idxs.push(m.index);

  const entries = [];
  for (let n = 0; n < idxs.length; n++) {
    const start = idxs[n] + "Preparation Instructions:".length;
    const end = n + 1 < idxs.length ? idxs[n + 1] : fullText.length;
    const block = fullText.slice(start, end);

    const headerStart = n > 0 ? idxs[n - 1] : 0;
    const header = fullText.slice(headerStart, idxs[n]);
    const treeNut = /Tree Nut Signage:\s*Yes/i.test(header);
    const demoKit = /Demo Kit:\s*Yes/i.test(header);

    // Product lines before the first numbered step
    const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
    const products = [];
    let stepStartI = 0;
    for (let i = 0; i < lines.length; i++) {
      if (/^\d{1,2}\.\s/.test(lines[i])) { stepStartI = i; break; }
      const pm = lines[i].match(/^(\d{4,8})\s*-\s*(.+)$/);
      if (pm) products.push(`${pm[1]} - ${pm[2]}`);
      stepStartI = i + 1;
    }

    // Walk the numbered steps; stop when numbering breaks or a stop header appears
    const rawTail = lines.slice(stepStartI).join("\n");
    const stepRe = /(\d{1,2})\.\s*([\s\S]*?)(?=(?:\d{1,2}\.\s)|$)/g;
    const stepLines = [];
    let expected = 1, sm;
    while ((sm = stepRe.exec(rawTail)) !== null) {
      const num = parseInt(sm[1], 10);
      let content = sm[2].trim();
      const low = content.toLowerCase();
      let stopPos = content.length;
      for (const h of STOP_HEADERS) {
        const p = low.indexOf(h);
        if (p !== -1) stopPos = Math.min(stopPos, p);
      }
      const truncated = stopPos < content.length;
      content = content.slice(0, stopPos).trim();
      if (num !== expected) {
        if (num < expected || num > expected + 1) break;
      }
      stepLines.push(content);
      expected = num + 1;
      if (truncated) break;
    }

    if (products.length && stepLines.length) {
      entries.push({
        products,
        stepsText: stepLines.join(" "),
        treeNut,
        demoKit
      });
    }
  }
  return entries;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function matchTools(stepsText, aliases, entry) {
  // Drop negated sentences so "DO NOT handout sample spoon" etc. don't match
  const text = stepsText
    .toLowerCase()
    .split(/(?<=[.!?])\s+/)
    .filter(s => !s.includes("do not") && !s.includes("don't") && !s.includes("never "))
    .join(" ");

  const found = new Set();
  // longest aliases first so multi-word phrases win
  const keys = Object.keys(aliases).sort((a, b) => b.length - a.length);
  for (const alias of keys) {
    const pat = new RegExp("(?<![\\w])" + escapeRe(alias) + "s?(?![\\w])");
    if (pat.test(text)) found.add(aliases[alias]);
  }
  if (text.includes("caffeine sign")) found.add("CAFFEINE SIGN");
  if (entry) {
    if (entry.treeNut) found.add("TREE NUT");
    if (entry.demoKit) found.add("DEMO KIT");
  }
  return [...found].sort();
}
