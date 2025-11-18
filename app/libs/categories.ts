// All display labels (what users see)
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


// Canonical codes (DB-safe)
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
} as const;


// Reverse mapping (code → label)
export const CODE_TO_LABEL = Object.fromEntries(
  Object.entries(LABEL_TO_CODE).map(([label, code]) => [code, label])
) as Record<CategoryCode, CategoryLabel>;


// All codes array
export const CATEGORY_CODES = Object.values(LABEL_TO_CODE) as CategoryCode[];


// Allowed category codes
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


// Runtime code validator
export const isValidCategoryCode = (c: string): c is CategoryCode =>
  CATEGORY_CODES.includes(c as CategoryCode);
