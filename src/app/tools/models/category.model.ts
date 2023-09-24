export const ALL_CATEGORIES = [
  'icons',
  'illustrations',
  'colors',
  'generators',
  'fonts',
  'libraries',
  'other',
] as const;

export type Category = (typeof ALL_CATEGORIES)[number];
