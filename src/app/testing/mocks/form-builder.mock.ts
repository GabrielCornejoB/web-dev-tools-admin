import { AbstractControl } from '@angular/forms';

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
    };
  }),
});
