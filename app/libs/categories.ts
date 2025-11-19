// ============================================================
// CATEGORY LABELS (same as before)
// ============================================================
export const CATEGORY_LABELS = [
  'AI',
  'Animation',
  'Branding',
  'Cards',
  'Character Design',
  'Editing',
  'Illustrations',
  'Infographics',
  'Interior/Exterior Design',
  'Insta Grid',
  'Labels/Stickers',
  'Logo Design',
  'Mockups',
  'Print Media',
  'Product/Packaging Design',
  'Silhouettes',
  'Social Media',
  'Stationary',
  'Typography',
  'UI/UX',
  'Vectors Design',
  'Video',
] as const;

export type CategoryLabel = typeof CATEGORY_LABELS[number];


// ============================================================
// CATEGORY CODES (DB safe)
// ============================================================
export type CategoryCode =
  | 'AI'
  | 'ANIMATION'
  | 'BRANDING'
  | 'CARDS'
  | 'CHARACTER_DESIGN'
  | 'EDITING'
  | 'ILLUSTRATIONS'
  | 'INFOGRAPHICS'
  | 'INTERIOR_EXTERIOR_DESIGN'
  | 'INSTA_GRID'
  | 'LABELS_STICKERS'
  | 'LOGO_DESIGN'
  | 'MOCKUPS'
  | 'PRINT_MEDIA'
  | 'PRODUCT_PACKAGING'
  | 'SILHOUETTES'
  | 'SOCIAL_MEDIA'
  | 'STATIONARY'
  | 'TYPOGRAPHY'
  | 'UI_UX'
  | 'VECTORS_DESIGN'
  | 'VIDEO';


// ============================================================
// LABEL → CODE mapping
// ============================================================
export const LABEL_TO_CODE: Record<CategoryLabel, CategoryCode> = {
  'AI': 'AI',
  'Animation': 'ANIMATION',
  'Branding': 'BRANDING',
  'Cards': 'CARDS',
  'Character Design': 'CHARACTER_DESIGN',
  'Editing': 'EDITING',
  'Illustrations': 'ILLUSTRATIONS',
  'Infographics': 'INFOGRAPHICS',
  'Interior/Exterior Design': 'INTERIOR_EXTERIOR_DESIGN',
  'Insta Grid': 'INSTA_GRID',
  'Labels/Stickers': 'LABELS_STICKERS',
  'Logo Design': 'LOGO_DESIGN',
  'Mockups': 'MOCKUPS',
  'Print Media': 'PRINT_MEDIA',
  'Product/Packaging Design': 'PRODUCT_PACKAGING',
  'Silhouettes': 'SILHOUETTES',
  'Social Media': 'SOCIAL_MEDIA',
  'Stationary': 'STATIONARY',
  'Typography': 'TYPOGRAPHY',
  'UI/UX': 'UI_UX',
  'Vectors Design': 'VECTORS_DESIGN',
  'Video': 'VIDEO',
};


// ============================================================
// CODE → LABEL
// ============================================================
export const CODE_TO_LABEL = Object.fromEntries(
  Object.entries(LABEL_TO_CODE).map(([label, code]) => [code, label])
) as Record<CategoryCode, CategoryLabel>;


// ============================================================
// CATEGORY CODES ARRAY
// ============================================================
export const CATEGORY_CODES = Object.values(LABEL_TO_CODE) as CategoryCode[];


// ============================================================
// SUBCATEGORIES (DEFAULT)
// ============================================================
export const SUBCATEGORIES: Record<CategoryCode, string[]> = {
  AI: ['AI Art', 'AI Enhancements', 'AI Retouch'],
  ANIMATION: ['Animated Videos','2D Animation', '3D Animation', 'Motion Graphics'],
  BRANDING: ['Brand Identity', 'Brand Guidelines', 'Strategy'],
  CARDS: ['Business','Id cards', 'Invitation', 'Greeting','menu cards'],
  CHARACTER_DESIGN: ['Mascots', 'Cartoon', '3D Characters'],
  EDITING: ['Photo Editing', 'Video Editing', 'Retouching'],
  ILLUSTRATIONS: ['Digital Art', 'Vector Art', 'Comic Style'],
  INFOGRAPHICS: ['Static Infographics', 'Animated Infographics'],
  INTERIOR_EXTERIOR_DESIGN: ['Interior 3D', 'Exterior 3D', 'Floor Plans'],
  INSTA_GRID: ['3x3 Grid', 'Puzzle Layouts'],
  LABELS_STICKERS: ['Stickers', 'Bottle Labels', 'Packaging Labels'],
  LOGO_DESIGN: ['Minimal', 'Mascot', 'Premium and Signature', 'Water Colors', '3D Logo'],
  MOCKUPS: ['Product Mockups', 'Branding Mockups', 'UI Mockups'],
  PRINT_MEDIA: ['Calendars','Flyer', 'Brochure','Media wall/Backdrop', 'magazines', 'Poster'],
  PRODUCT_PACKAGING: ['Box Design', 'Pouch Design', 'Bottle Packaging'],
  SILHOUETTES: [],
  SOCIAL_MEDIA: ['Posts', 'Stories', 'Carousel', 'Reels'],
  STATIONARY: ['Letterhead','Merchandise', 'Envelope', 'Business Card'],
  TYPOGRAPHY: ['English', 'Urdu','Arabic'],
  UI_UX: ['Web UI', 'Mobile UI', 'Wireframes'],
  VECTORS_DESIGN: [],
  VIDEO: ['Talking Heads','Ads','vlogs','Digital Video','Comercial (DVC)','Explainer Videos','Short Form','Corporate'],
};


// ============================================================
// REVERSE SUBCATEGORY → CATEGORY
// ============================================================
export const SUBCATEGORY_TO_CATEGORY: Record<string, CategoryCode> = {};
Object.entries(SUBCATEGORIES).forEach(([cat, subs]) => {
  for (const s of subs) SUBCATEGORY_TO_CATEGORY[s] = cat as CategoryCode;
});


// ============================================================
// HELPERS
// ============================================================
export const isValidCategoryCode = (c: string): c is CategoryCode =>
  CATEGORY_CODES.includes(c as CategoryCode);

export const getSubcategories = (c: CategoryCode): string[] =>
  SUBCATEGORIES[c] || [];

export const isValidSubcategory = (c: CategoryCode, s: string) =>
  SUBCATEGORIES[c]?.includes(s) ?? false;
