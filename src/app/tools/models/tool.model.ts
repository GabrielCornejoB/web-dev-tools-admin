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

export interface CreateToolDTO extends Omit<Tool, 'id'> {}

export interface UpdateToolDTO extends Partial<CreateToolDTO> {}
