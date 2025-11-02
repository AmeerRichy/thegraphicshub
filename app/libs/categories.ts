// All display labels (what users see)
export const CATEGORY_LABELS = [
  'AI',
  'Animation',
  'Branding',
  'Cards',
  'Character Design',
  'Editing',
  'Interior/Exterior Design',
  'Illustrations',
  'Infographics',
  'Logo Design',
  'Print Media',
  'Product/Packaging Design',
  'Silhouettes',
  'Social Media',
  'Stationary',
  'UI/UX',
  'Video',
] as const;
export type CategoryLabel = typeof CATEGORY_LABELS[number];

// Canonical codes (what we store in DB / send to API)
export const LABEL_TO_CODE: Record<CategoryLabel, CategoryCode> = {
  'AI': 'AI',
  'Animation': 'ANIMATION',
  'Branding': 'BRANDING',
  'Cards': 'CARDS',
  'Character Design': 'CHARACTER_DESIGN',
  'Editing': 'EDITING',
  'Interior/Exterior Design': 'INTERIOR_EXTERIOR_DESIGN',
  'Illustrations': 'ILLUSTRATIONS',
  'Infographics': 'INFOGRAPHICS',
  'Logo Design': 'LOGO_DESIGN',
  'Print Media': 'PRINT_MEDIA',
  // keep the existing code name to avoid DB migration
  'Product/Packaging Design': 'PRODUCT_PACKAGING',
  'Silhouettes': 'SILHOUETTES',
  'Social Media': 'SOCIAL_MEDIA',
  'Stationary': 'STATIONARY',   // (spelling kept to match your existing)
  'UI/UX': 'UI_UX',
  'Video': 'VIDEO',
} as const;

export const CODE_TO_LABEL = Object.fromEntries(
  Object.entries(LABEL_TO_CODE).map(([label, code]) => [code, label])
) as Record<CategoryCode, CategoryLabel>;

export const CATEGORY_CODES = Object.values(LABEL_TO_CODE) as CategoryCode[];
export type CategoryCode =
  | 'AI'
  | 'ANIMATION'
  | 'BRANDING'
  | 'CARDS'
  | 'CHARACTER_DESIGN'
  | 'EDITING'
  | 'INTERIOR_EXTERIOR_DESIGN'
  | 'ILLUSTRATIONS'
  | 'INFOGRAPHICS'
  | 'LOGO_DESIGN'
  | 'PRINT_MEDIA'
  | 'PRODUCT_PACKAGING'
  | 'SILHOUETTES'
  | 'SOCIAL_MEDIA'
  | 'STATIONARY'
  | 'UI_UX'
  | 'VIDEO';

export const isValidCategoryCode = (c: string): c is CategoryCode =>
  CATEGORY_CODES.includes(c as CategoryCode);
