import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Category } from '../models/category.model';
import { CreateToolDTO, Tool } from '../models/tool.model';
import { FirebaseError } from 'firebase/app';

export const toolsActions = createActionGroup({
  source: 'tools',
  events: {
    'Get tools': emptyProps(),
    'Get filtered tools': props<{ category: Category }>(),
    'Get tools success': props<{ tools: Tool[] }>(),
    'Get tools failure': props<{ error: FirebaseError }>(),

    'Create tool': props<{ toolDto: CreateToolDTO }>(),
    'Create tool success': props<{ newTool: Tool }>(),
    'Create tool failure': props<{ error: FirebaseError }>(),
  },
});
