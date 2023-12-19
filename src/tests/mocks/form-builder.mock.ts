import { AbstractControl } from '@angular/forms';

/**
 * FormBuilder mock meant to be used in Unit Tests
 * @param initialValue The form's initial value, must be an object
 * @param invalid If marked as true, it'll set errors to the form and the form controls
 * @returns A partial object of the AbstractControl class
 */
export const FormBuilderMock = <T extends {}>(
  initialValue: T,
  invalid: boolean
) => ({
  group: jest.fn(() => {
    const controls: { [key: string]: Partial<AbstractControl> } = {};
    for (const field in initialValue) {
      controls[field] = {
        errors: invalid ? { error: 'error' } : null,
        touched: invalid ? true : false,
        setErrors: jest.fn(),
      };
    }

    return {
      markAllAsTouched: jest.fn(),
      value: { ...initialValue },
      invalid,
      controls,
      errors: invalid ? { error: 'error' } : null,
    };
  }),
});
