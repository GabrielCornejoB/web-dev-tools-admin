import { Component, inject } from '@angular/core';
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
  //* Dependencies
  private fb = inject(FormBuilder);

  //* Attributes
  toolForm: FormGroup = this.createForm();
  initialTags: string[] = ['hola', 'mundo', 'uwu', 'donda', 'yeezy', 'mun'];
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
      name: this.toolForm.controls['name'].value,
      category: this.toolForm.controls['category'].value,
      description: this.toolForm.controls['description'].value,
      url: this.toolForm.controls['url'].value,
      author: this.toolForm.controls['author'].value,
      tags: [...this.tags],
    };
    console.log(newTool);
  }
  addTag(emittedValue: string) {
    if (this.tags.includes(emittedValue)) return console.log('Alert uwu');
    this.tags = [...this.tags, emittedValue];
    console.log(this.tags);
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
