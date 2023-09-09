import { Injectable, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators as V,
  ValidationErrors,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private fb = inject(FormBuilder);

  constructor() {}

  // * FormGroup functions
  public getErrorFromField(formGroup: FormGroup, field: string): string | null {
    if (!formGroup.controls[field]) return null;
    const errors = formGroup.controls[field].errors || {};

    return this.getErrorMessages(errors);
  }
  public isValidField(formGroup: FormGroup, field: string): boolean | null {
    return (
      formGroup.controls[field].errors && formGroup.controls[field].touched
    );
  }

  // * FormArray Functions
  public deleteFieldInArray(formArray: FormArray, i: number): void {
    formArray.removeAt(i);
  }
  public addFieldToArray(formArray: FormArray): void {
    formArray.push(this.fb.control('', [V.required]));
  }
  public getErrorFromFieldInArray(
    formArray: FormArray,
    i: number,
  ): string | null {
    if (!formArray.controls[i]) return null;
    const errors = formArray.controls[i].errors || {};
    return this.getErrorMessages(errors);
  }
  public isValidFieldInArray(formArray: FormArray, i: number): boolean | null {
    return formArray.controls[i].errors && formArray.controls[i].touched;
  }

  // * General purpose Functions
  private getErrorMessages(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `This field required at least ${errors['minlength'].requiredLength} characters`;
        case 'maxlength':
          return `This field cannot be more than ${errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}
