import { Category } from './category.model';

export interface Tool {
  id: string;
  name: string;
  author: string;
  url: string;
  imageURL?: string;
  description: string;
  category: Category;
  tags: string[];
}
export interface ToolDTO extends Omit<Tool, 'id'> {}
