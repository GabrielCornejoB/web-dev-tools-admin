import { createFeature, createReducer, on } from '@ngrx/store';
import { ToolsState } from './tools.state';
import { toolsActions } from './tools.actions';

const initialState: ToolsState = {
  isSubmitting: false,
  backendError: null,
};

const toolsFeature = createFeature({
  name: 'tools',
  reducer: createReducer(
    initialState,
    on(toolsActions.create, (state) => ({
      ...state,
      isSubmitting: true,
      backendError: null,
    })),
    on(toolsActions.createSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(toolsActions.createFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      backendError: action.backendError,
    })),
  ),
});

export const {
  name: toolsFeatureKey,
  reducer: toolsReducer,
  selectBackendError,
  selectIsSubmitting,
} = toolsFeature;
