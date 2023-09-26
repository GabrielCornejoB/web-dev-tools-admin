import { createFeature, createReducer, on } from '@ngrx/store';
import { Tool } from '../models/tool.model';
import { toolsActions } from './actions';
import { Actions } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';

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
    // GET
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

    // CREATE
    on(toolsActions.createTool, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(toolsActions.createToolSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: state.data ? [action.newTool, ...state.data] : state.data,
    })),
    on(toolsActions.createToolFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error.message,
    })),

    // DELETE
    on(toolsActions.deleteTool, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(toolsActions.deleteToolSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: state.data
        ? [...state.data.filter((tool) => tool.id !== action.id)]
        : state.data,
    })),
    on(toolsActions.deleteToolFailure, (state, actions) => ({
      ...state,
      isLoading: false,
      error: actions.error.message,
    })),

    on(routerNavigationAction, () => initialState),
  ),
});

export const {
  name: toolsFeatureKey,
  reducer: toolsReducer,
  selectIsLoading,
  selectError,
  selectData: selectTools,
} = toolsFeature;
