import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators as V,
} from '@angular/forms';
import { Category } from '../../models/category.model';

@Component({
  selector: 'wdt-form-page',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent {
  private fb = inject(FormBuilder);

  // TODO: Fetch this data from db
  public categories: string[] = Object.values(Category);
  // TODO: Fetch this data based on the selected category
  // tags: string[] = ['CSS', 'SVG'];

  public toolForm: FormGroup = this.fb.group({
    name: ['', [V.required, V.minLength(3), V.maxLength(30)]],
    author: ['', [V.required, V.minLength(3), V.maxLength(30)]],
    url: ['', [V.required, V.minLength(5)]],
    description: ['', [V.required, V.minLength(10), V.maxLength(100)]],
    imageUrl: ['', []],
    category: this.fb.control<Category>(Category.COLORS, [V.required]),
    tags: this.fb.array([['', [V.required, V.minLength(2)]]]),
  });

  // *TAGS
  public get tags(): FormArray {
    return this.toolForm.get('tags') as FormArray;
  }
  public onDeleteTag(i: number): void {
    this.tags.removeAt(i);
  }
  public onAddTag(): void {
    this.tags.push(this.fb.control('', [V.required, V.minLength(2)]));
  }

  public onSubmit(): void {
    if (this.toolForm.invalid) return this.toolForm.markAllAsTouched();

    console.log(this.toolForm.value);
    this.toolForm.reset();
    (this.toolForm.controls['tags'] as FormArray) = this.fb.array(['']);
  }

  public getErrorFromField(field: string): string | null {
    if (!this.toolForm.controls[field]) return null;

    const errors = this.toolForm.controls[field].errors || {};

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
  public isValidField(field: string): boolean | null {
    return (
      this.toolForm.controls[field].errors &&
      this.toolForm.controls[field].touched
    );
  }
  public getErrorFromFieldInArray(
    formArray: FormArray,
    i: number,
  ): string | null {
    if (!formArray.controls[i]) return null;

    const errors = formArray.controls[i].errors || {};
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
  public isValidFieldInArray(formArray: FormArray, i: number): boolean | null {
    return formArray.controls[i].errors && formArray.controls[i].touched;
  }
}
