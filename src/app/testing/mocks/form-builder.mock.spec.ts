import { FormBuilderMock } from './form-builder.mock';

describe('FormBuilder - Mock', () => {
  let mockData: { [key: string]: any };

  beforeEach(() => {
    mockData = {
      username: 'testUser',
      password: 'testPassword',
    };
  });

  it('should create a valid form group', () => {
    const formBuilderMock = FormBuilderMock(mockData, false);

    const formGroup = formBuilderMock.group();

    expect(formGroup).toBeTruthy();
    expect(formGroup.markAllAsTouched).not.toHaveBeenCalled();
    expect(formGroup.invalid).toBeFalsy();
    expect(formGroup.controls).toBeTruthy();
  });

  it('should create an invalid form group', () => {
    const formBuilderMock = FormBuilderMock(mockData, true);

    const formGroup = formBuilderMock.group();

    expect(formGroup).toBeTruthy();
    expect(formGroup.markAllAsTouched).not.toHaveBeenCalled();
    expect(formGroup.invalid).toBeTruthy();
    expect(formGroup.controls).toBeTruthy();

    expect(formGroup.errors).toEqual({ error: 'error' });
  });
});
