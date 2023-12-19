import { FormControl } from '@angular/forms';
import { Category } from './category.model';

export interface ToolForm {
  name: FormControl<string | null>;
  category: FormControl<Category | null>;
  description: FormControl<string | null>;
  url: FormControl<string | null>;
  author: FormControl<string | null>;
  tag: FormControl<string | null>;
}
