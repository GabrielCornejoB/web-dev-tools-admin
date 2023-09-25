import { createFeature, createReducer, on } from '@ngrx/store';
import { Tool } from '../models/tool.model';
import { toolsActions } from './actions';

interface ToolsState {
  isLoading: boolean;
  error: string | null;
  data: Tool[] | null;
}

const initialState: ToolsState = {
  isLoading: false,
  error: null,
  data: null,
};
const toolsFeature = createFeature({
  name: 'tools',
  reducer: createReducer(
    initialState,
    on(toolsActions.getTools, (state) => ({
      ...state,
      data: null,
      isLoading: true,
    })),

    on(toolsActions.getFilteredTools, (state) => ({
      ...state,
      data: null,
      isLoading: true,
    })),

    on(toolsActions.getToolsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.tools,
    })),

    on(toolsActions.getToolsFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error.message,
    })),
  ),
});

export const {
  name: toolsFeatureKey,
  reducer: toolsReducer,
  selectIsLoading,
  selectError,
  selectData: selectTools,
} = toolsFeature;
