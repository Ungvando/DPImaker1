// ====== PREP SHEET LAYOUT (Cart Setup List) ======
// Each section: title + two columns of item names (exactly as printed).
export const SHEET_SECTIONS = [
  {
    title: "BASICS",
    col1: ["PAPER TOWELS", "EXTENSION CORD", "RED TRAYS x4", "SCISSORS", "SPRAY BOTTLE", "SANITIZER BOTTLE"],
    col2: ["MARKER/PENCIL", "ALLERGY SIGN", "CUTTING BOARD X2", "SILICONE POT-HOLDER", "OVEN MITT"]
  },
  {
    title: "SIGNAGE/COLLATERAL",
    col1: ["POP SIGN HOLDER", "TREE NUT", "DPIS", "HIRING SIGN"],
    col2: ["DEMO KIT", "DRY SAMPLES", "SIGN HOLDER", "CAFFEINE SIGN"]
  },
  {
    title: "SUPPLIES",
    col1: ["BAKING CUPS", "2 OZ. SOUFFLE", "3 OZ. DRINK CUPS", "4 OZ. STYRO CUPS", "OLIVE OIL", "VEGETABLE OIL", "PARCHMENT PAPER"],
    col2: ["TASTER FORKS", "TASTER SPOONS", "COFFEE STIRRERS", "WAX PAPER", "NAPKIN HOLDER", "NAPKIN REFILLS", "ZIPLOCK BAG"]
  },
  {
    title: "EQUIPMENT",
    col1: ["AIR FRYER", "BLENDER", "CAN OPENER", "MULTICOOKER/PLUG", "COFFEE MAKER", "HOT SHIELD + SIGN", "HOT PADS x2", "COOLER BAG", "ICE CHEST", "MICROWAVE"],
    col2: ["OVEN/PANS x6", "OVEN/BASKETS X4", "OVEN/WIRE RACK", "RAW MEAT SET UP", "SKILLET/PLUG", "TOASTER", "GRIDDLE", "KETTLE"]
  },
  {
    title: "DISHES",
    col1: ["BOWL SMALL", "BOWL MED.", "BOWL LARGE", "TORTILLA WARMER", "BLACK CONTAINER", "STRAINER"],
    col2: ["SHAKER BOTTLE", "SQUEEZE BOTTLE", "1 GAL PITCHER", "2.5-GAL WATER JUG"]
  },
  {
    title: "UTENSILS (2 of each)",
    col1: ["FORK", "SPOON", "TONGS", "KNIFE SM LG", "BUTTER KNIFE", "FOOD SHEARS", "COOKIE SCOOP", "SLOTTED SPOON", "LADLE"],
    col2: ["FLIPPING SPATULA", "SCRAPING SPATULA", "SPREADING SPATULA", "PIZZA CUTTER", "DOUGH CUTTER", "MEASURING CUPS", "MEASURING SPOONS", "BASTING BRUSH", "WHISK"]
  }
];

export const ALL_ITEMS = SHEET_SECTIONS.flatMap(s => [...s.col1, ...s.col2]);

// ====== DEFAULT ALIASES ======
// phrase in the prep instructions (lowercase) -> item name on the sheet.
// User-added aliases from the settings screen are merged on top of these.
export const DEFAULT_ALIASES = {
  // BASICS
  "paper towel": "PAPER TOWELS",
  "extension cord": "EXTENSION CORD",
  "red tray": "RED TRAYS x4",
  "kitchen scissors": "SCISSORS",
  "spray bottle": "SPRAY BOTTLE",
  "sanitizer": "SANITIZER BOTTLE",
  "cutting board": "CUTTING BOARD X2",
  "oven mitt": "OVEN MITT",
  "pot holder": "SILICONE POT-HOLDER",
  "potholder": "SILICONE POT-HOLDER",

  // SUPPLIES
  "baking cup": "BAKING CUPS",
  "2oz cup": "2 OZ. SOUFFLE",
  "2 oz cup": "2 OZ. SOUFFLE",
  "2oz. cup": "2 OZ. SOUFFLE",
  "souffle cup": "2 OZ. SOUFFLE",
  "drink cup": "3 OZ. DRINK CUPS",
  "3oz cup": "3 OZ. DRINK CUPS",
  "3oz. cup": "3 OZ. DRINK CUPS",
  "3 oz cup": "3 OZ. DRINK CUPS",
  "styro cup": "4 OZ. STYRO CUPS",
  "4oz styro": "4 OZ. STYRO CUPS",
  "4oz cup": "4 OZ. STYRO CUPS",
  "4oz. cup": "4 OZ. STYRO CUPS",
  "olive oil": "OLIVE OIL",
  "vegetable oil": "VEGETABLE OIL",
  "parchment paper": "PARCHMENT PAPER",
  "taster fork": "TASTER FORKS",
  "taster spoon": "TASTER SPOONS",
  "stirrer": "COFFEE STIRRERS",
  "wax paper": "WAX PAPER",
  "ziplock": "ZIPLOCK BAG",

  // EQUIPMENT
  "air fryer": "AIR FRYER",
  "blender": "BLENDER",
  "can opener": "CAN OPENER",
  "multicooker": "MULTICOOKER/PLUG",
  "coffee maker": "COFFEE MAKER",
  "coffee urn": "COFFEE MAKER",
  "microwave": "MICROWAVE",
  "oven/pan": "OVEN/PANS x6",
  "baking sheet": "OVEN/PANS x6",
  "baking tray": "OVEN/PANS x6",
  "oven basket": "OVEN/BASKETS X4",
  "wire rack": "OVEN/WIRE RACK",
  "oven rack": "OVEN/WIRE RACK",
  "skillet": "SKILLET/PLUG",
  "toaster": "TOASTER",
  "griddle": "GRIDDLE",
  "kettle": "KETTLE",
  "cooler bag": "COOLER BAG",
  "ice chest": "ICE CHEST",

  // DISHES
  "small bowl": "BOWL SMALL",
  "medium bowl": "BOWL MED.",
  "separate bowls": "BOWL MED.",
  "large bowl": "BOWL LARGE",
  "tortilla warmer": "TORTILLA WARMER",
  "holding container": "BLACK CONTAINER",
  "black container": "BLACK CONTAINER",
  "strainer": "STRAINER",
  "shaker bottle": "SHAKER BOTTLE",
  "squeeze bottle": "SQUEEZE BOTTLE",
  "pitcher": "1 GAL PITCHER",
  "water jug": "2.5-GAL WATER JUG",

  // UTENSILS
  "fork": "FORK",
  "spoon": "SPOON",
  "tongs": "TONGS",
  "knife": "KNIFE SM LG",
  "butter knife": "BUTTER KNIFE",
  "food shears": "FOOD SHEARS",
  "package shears": "FOOD SHEARS",
  "packaging shears": "FOOD SHEARS",
  "cookie scoop": "COOKIE SCOOP",
  "slotted spoon": "SLOTTED SPOON",
  "ladle": "LADLE",
  "flipping spatula": "FLIPPING SPATULA",
  "spatula": "FLIPPING SPATULA",
  "turning spatula": "FLIPPING SPATULA",
  "scraping spatula": "SCRAPING SPATULA",
  "spreading spatula": "SPREADING SPATULA",
  "pizza cutter": "PIZZA CUTTER",
  "pizza wheel": "PIZZA CUTTER",
  "dough cutter": "DOUGH CUTTER",
  "measuring cup": "MEASURING CUPS",
  "measuring spoon": "MEASURING SPOONS",
  "basting brush": "BASTING BRUSH",
  "whisk": "WHISK"
};
