import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators as V,
} from '@angular/forms';
import { Category } from '../../models/category.model';
import { FormService } from '../../services/form.service';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'wdt-form-page',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent {
  private fb = inject(FormBuilder);
  private fs = inject(FormService);
  private toolsService = inject(ToolsService);

  public categories: string[] = Object.values(Category);

  public toolForm: FormGroup = this.fb.group({
    name: ['', [V.required, V.minLength(3), V.maxLength(30)]],
    author: ['', [V.required, V.minLength(3), V.maxLength(30)]],
    url: ['', [V.required, V.minLength(5)]],
    description: ['', [V.required, V.minLength(10), V.maxLength(100)]],
    imageUrl: ['', []],
    category: this.fb.control<Category>(Category.COLORS, [V.required]),
    tags: this.fb.array([['', [V.required, V.minLength(2)]]]),
  });

  public onSubmit(): void {
    if (this.toolForm.invalid) return this.toolForm.markAllAsTouched();

    console.log(this.toolForm.value);
    this.toolForm.reset();
    (this.toolForm.controls['tags'] as FormArray) = this.fb.array([
      '',
      [V.required, V.minLength(2)],
    ]);
  }
  public showPreview(): void {
    this.toolsService.updateTool(this.toolForm.value);
  }

  // * Tags Array manipulation
  public get tags(): FormArray {
    return this.toolForm.get('tags') as FormArray;
  }
  public onDeleteTag(i: number): void {
    this.fs.deleteFieldInArray(this.tags, i);
  }
  public onAddTag(): void {
    this.fs.addFieldToArray(this.tags);
  }

  // * Validate Form Controls
  public getErrorFromField(field: string): string | null {
    return this.fs.getErrorFromField(this.toolForm, field);
  }
  public isValidField(field: string): boolean | null {
    return this.fs.isValidField(this.toolForm, field);
  }

  // * Validate Tags
  public getErrorFromTag(i: number): string | null {
    return this.fs.getErrorFromFieldInArray(this.tags, i);
  }
  public isValidTag(i: number): boolean | null {
    return this.fs.isValidFieldInArray(this.tags, i);
  }
}
