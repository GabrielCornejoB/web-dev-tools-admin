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
  categories: string[] = ['icons', 'colors', 'generators'];
  // TODO: Fetch this data based on the selected category
  tags: string[] = ['CSS', 'SVG'];

  public toolForm: FormGroup = this.fb.group({
    name: ['', [V.required, V.minLength(3), V.maxLength(30)]],
    author: ['', [V.required, V.minLength(3), V.maxLength(30)]],
    url: ['', [V.required, V.minLength(5)]],
    description: ['', [V.required, V.minLength(10), V.maxLength(100)]],
    imageUrl: ['', []],
    category: this.fb.control<Category>(Category.COLORS, [V.required]),
    tags: this.fb.array([['', [V.required, V.minLength(2)]]]),
  });

  public onSubmit() {
    if (this.toolForm.invalid) return this.toolForm.markAllAsTouched();

    console.log(this.toolForm.value);
    this.toolForm.reset();
    (this.toolForm.controls['tags'] as FormArray) = this.fb.array([]);
  }
}
