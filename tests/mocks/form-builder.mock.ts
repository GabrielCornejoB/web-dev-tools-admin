import { AbstractControl, FormBuilder } from '@angular/forms';

/**
 * FormBuilder mock meant to be used in Unit Tests
 * @param initialValue The form's initial value, must be an object
 * @param invalid If marked as true, it'll set errors to the form and the form controls
 * @returns A partial object of the AbstractControl class
 */
export const FormBuilderMock = <T extends {}>(
  initialValue: T,
  formStatus: 'valid' | 'invalid',
) =>
  ({
    group: jest.fn(() => {
      const controls: { [key: string]: Partial<AbstractControl> } = {};
      const isInvalid: boolean = formStatus === 'invalid';
      for (const field in initialValue) {
        controls[field] = {
          errors: isInvalid ? { error: 'error' } : null,
          touched: isInvalid ? true : false,
          setErrors: jest.fn(),
        };
      }

      return {
        markAllAsTouched: jest.fn(),
        value: { ...initialValue },
        invalid: isInvalid,
        controls,
        errors: isInvalid ? { error: 'error' } : null,
      };
    }),
    control: jest.fn(),
  }) as any as FormBuilder;
