# DPI Prep Sheet Generator (Chrome Extension)

Turns your daily DPI PDF into printable Cart Setup prep sheets with the
tools each product needs already highlighted.

## Install (one time)
1. Download and unzip this folder anywhere on your computer.
2. Open Chrome and go to: chrome://extensions
3. Turn ON "Developer mode" (top-right toggle).
4. Click "Load unpacked" and select this folder.
5. The icon appears in your toolbar (pin it if you want).

Step by step tutorial
1. Click the green code button and download zip to install the zip file.

   <img width="1439" height="662" alt="1" src="https://github.com/user-attachments/assets/173dc6f6-5c73-4c33-8fb7-3e405a742c6c" />



## Daily use
1. Click the extension icon — a tab opens.
2. Choose (or drag in) your daily DPI PDF.
3. Review screen: each product shows its highlighted tools.
   - Uncheck a product to skip it (no-tool drink demos start unchecked).
   - Click ✕ on a wrong tool, or "+ add tool" for a missed one.
4. Click "Save Prep Sheets PDF" — downloads a PDF that uses your real
   Cart Setup List sheet as the background, 2 products per page.
   Print it, cut down the dashed line.

## Default highlights & demo templates (edit templates.js)
Open templates.js in the extension folder with any text editor:
- ALWAYS_HIGHLIGHT: items highlighted on every sheet.
- DEMO_TEMPLATES: presets you pick per DPI on the review screen
  ("Coffee Demo", "Oven Demo", ...). Add or edit lists freely — item
  names must match the sheet exactly. Reload the extension
  (chrome://extensions -> refresh icon) after saving changes.

## Teaching it new words (Aliases button)
When a DPI says something the extension doesn't recognize
(e.g. "microwave safe dish"), open Aliases and add a line:

    microwave safe dish => BOWL LARGE

Format: phrase => SHEET ITEM (must exactly match an item printed on the
sheet). Saved in Chrome storage, kept between sessions.

## Notes / limits
- Entries with combined demos (2 products, 1 prep) share one sheet.
- "Tree Nut Signage: Yes" auto-highlights TREE NUT; caffeine warnings
  highlight CAFFEINE SIGN; "Demo Kit: Yes" highlights DEMO KIT.
- Sentences with "do not" are ignored so negative instructions don't
  cause false highlights.
