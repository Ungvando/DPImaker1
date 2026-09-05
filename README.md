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

2. Find the download file right click the file and click extract all

   <img width="991" height="543" alt="2" src="https://github.com/user-attachments/assets/f4a158e6-5e62-49f1-b0e3-681696071be0" />

   <img width="616" height="450" alt="3" src="https://github.com/user-attachments/assets/b9bbfc2d-5feb-486c-8950-61e41db54db7" />

3. On chrome click on extension button on the top right hand and click manage extension and open developer mode on the top right.

   <img width="486" height="421" alt="4" src="https://github.com/user-attachments/assets/64d430e1-e20e-4601-bc51-8af43910c557" />

   <img width="1448" height="259" alt="5" src="https://github.com/user-attachments/assets/8ca64e7c-5d0c-4d40-bd89-586a14dd2203" />

4. Click load extension and double click the extract folder after that select the folder inside to load.

   <img width="1439" height="249" alt="6" src="https://github.com/user-attachments/assets/db7e309d-ab6e-4e79-ad50-5f791c122743" />

   Double click in the folder
   <img width="698" height="464" alt="7" src="https://github.com/user-attachments/assets/4d6fc851-944a-40b6-8ad7-bea9e8957d11" />

   Double check URL should be "Downloads\DPImaker1-main"
   <img width="708" height="466" alt="8" src="https://github.com/user-attachments/assets/60c76f37-d27e-4b11-a35b-2ed438e2ff4f" />

5. Click on extension button again on chrome to pin the extension

   <img width="445" height="478" alt="9" src="https://github.com/user-attachments/assets/5b556928-edf6-4b55-8a37-1dfcf382745a" />

Done!

Using -- Upload DPIS file from DPI download button and it will generate the prepsheets



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
