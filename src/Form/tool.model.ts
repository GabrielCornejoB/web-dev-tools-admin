export enum Category {
  ICONS = 'icons',
  ILLUSTRATIONS = 'illustrations',
  REACT = 'react',
  COLORS = 'colors',
  GENERATORS = 'generators',
  FONTS = 'fonts',
  LIBRARIES = 'libraries',
}

export interface Tool {
  name: string;
  author: string;
  description: string;
  category: Category;
  tags: string[];
  imageURL?: string;
}
