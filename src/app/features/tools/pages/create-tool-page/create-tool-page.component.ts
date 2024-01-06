import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AutocompleteComponent,
  HeaderComponent,
  InputComponent,
  SelectComponent,
  TextareaComponent,
} from '@shared/components';
import { ButtonDirective } from '@shared/directives';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators as V,
} from '@angular/forms';
import { Tool, ToolForm } from '@core/models';
import { canPrintError, getErrorFromField } from '@core/utils';
import { isValidUrl } from '@core/validators';
import { Store } from '@ngrx/store';
import { toolsActions } from '@store/tools/tools.actions';

@Component({
  selector: 'wdt-create-tool-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    HeaderComponent,
    InputComponent,
    TextareaComponent,
    SelectComponent,
    AutocompleteComponent,
    ButtonDirective,
  ],
  templateUrl: './create-tool-page.component.html',
})
export class CreateToolPageComponent {
  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {}

  //* Attributes
  toolForm: FormGroup = this.createForm();
  initialTags: string[] = ['hola', 'mundo', 'uwu', 'donda', 'yeey', 'mun'];
  tags: string[] = [];

  //* Functions
  onSubmit() {
    if (this.toolForm.invalid) {
      if (this.tags.length === 0)
        this.toolForm.controls['tag'].setErrors({ noTags: true });
      if (this.tags.length > 5)
        this.toolForm.controls['tag'].setErrors({ aLotOfTags: true });

      return this.toolForm.markAllAsTouched();
    }

    const newTool: Tool = {
      uid: this.toolForm.controls['name'].value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-'),
      name: this.toolForm.controls['name'].value,
      category: this.toolForm.controls['category'].value,
      description: this.toolForm.controls['description'].value,
      url: this.toolForm.controls['url'].value,
      author: this.toolForm.controls['author'].value,
      tags: [...this.tags],
    };
    // console.log(newTool);
    this.store.dispatch(toolsActions.create({ tool: newTool }));
  }
  addTag(emittedValue: string) {
    const lowercaseTags = this.tags.map((tag) => tag.toLowerCase());
    const lowercaseValue = emittedValue.toLowerCase().trim();

    if (!lowercaseTags.includes(lowercaseValue) && this.tags.length < 5)
      this.tags = [...this.tags, emittedValue];
  }
  removeTag(index: number) {
    this.tags = this.tags.filter((tag, i) => i !== index);
  }

  //* Utils
  getError(field: string) {
    return getErrorFromField(this.toolForm, field);
  }
  hasError(field: string) {
    return canPrintError(this.toolForm, field);
  }
  createForm() {
    return this.fb.group<ToolForm>({
      name: this.fb.control('', [V.required, V.minLength(3), V.maxLength(20)]),
      category: this.fb.control(null, [V.required]),
      description: this.fb.control('', [
        V.required,
        V.minLength(5),
        V.maxLength(100),
      ]),
      url: this.fb.control('', [V.required, isValidUrl]),
      author: this.fb.control('', [
        V.required,
        V.minLength(3),
        V.maxLength(20),
      ]),
      tag: this.fb.control('', [V.minLength(3), V.maxLength(10)]),
    });
  }
}
