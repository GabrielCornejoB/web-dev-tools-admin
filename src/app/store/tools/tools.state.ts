import { BackendError } from '@core/models';

export interface ToolsState {
  isSubmitting: boolean;
  backendError: BackendError | null;
}
