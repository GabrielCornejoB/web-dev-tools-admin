import { Category } from './category.model';

export interface Tool {
  uid: string;
  name: string;
  category: Category;
  description: string;
  url: string;
  author: string;
  tags: string[];
}
