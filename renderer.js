// Builds the output PDF: copies the scanned Cart Setup template page for
// every pair of entries, draws highlight rectangles over the matched items,
// and writes the product name/number at the top of each half.
import { PDFDocument, StandardFonts, rgb } from "./pdfjs/pdf-lib.esm.min.js";
import { ITEMS_PX, RENDER_DPI } from "./template_coords.js";

const SCALE = 72 / RENDER_DPI; // template pixels -> PDF points
const HIGHLIGHT = rgb(0.99, 0.91, 0.35);
const PAGE_W = 612, PAGE_H = 792; // letter

let templateBytes = null;
async function getTemplateBytes() {
  if (!templateBytes) {
    const res = await fetch("./template.jpg"); // compressed scan of the sheet
    templateBytes = await res.arrayBuffer();
  }
  return templateBytes;
}

export async function buildPdf(includedEntries) {
  const out = await PDFDocument.create();
  const font = await out.embedFont(StandardFonts.HelveticaBold);
  // Embed the template image ONCE so every output page shares it (small file)
  const bg = await out.embedJpg(await getTemplateBytes());
  const mbTop = PAGE_H;
  const mbLeft = 0;
  const mb = { x: 0, y: 0 };

  for (let i = 0; i < includedEntries.length; i += 2) {
    const page = out.addPage([PAGE_W, PAGE_H]);
    page.drawImage(bg, { x: 0, y: 0, width: PAGE_W, height: PAGE_H });

    const pair = includedEntries.slice(i, i + 2);
    const halves = ["L", "R"];
    for (let h = 0; h < pair.length; h++) {
      const entry = pair[h];
      const items = ITEMS_PX[halves[h]];

      // highlights (page is 0-based now, so subtract the template offset)
      for (const tool of entry.tools) {
        const box = items[tool];
        if (!box) continue;
        const [l, t, r, b] = box;
        const pad = 2;
        page.drawRectangle({
          x: mbLeft + l * SCALE - pad - mb.x,
          y: mbTop - b * SCALE - pad - mb.y,
          width: (r - l) * SCALE + pad * 2,
          height: (b - t) * SCALE + pad * 2,
          color: HIGHLIGHT,
          opacity: 0.55
        });
      }

      // product header in the blank space above the first box
      const headerX = mbLeft + items["PAPER TOWELS"][0] * SCALE - mb.x;
      let y = mbTop - 22 - mb.y;
      for (const line of entry.products) {
        page.drawText(line.slice(0, 60), { x: headerX, y, size: 9, font });
        y -= 11;
      }
    }
  }
  return out.save(); // Uint8Array
}

export function downloadPdf(bytes, filename) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
