import { Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators as V,
} from '@angular/forms';
import { Category } from '../../models/category.model';
import { FormService } from '../../services/form.service';
import { ToolsService } from '../../services/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Tool } from '../../models/tool.model';

@Component({
  selector: 'wdt-form-page',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private fs = inject(FormService);
  private aRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private toolsService = inject(ToolsService);

  public categories: string[] = Object.values(Category);
  public toolForm: FormGroup = this.fb.group({
    name: ['', [V.required, V.minLength(3), V.maxLength(30)]],
    author: ['', [V.required, V.minLength(3), V.maxLength(30)]],
    url: ['', [V.required, V.minLength(5)]],
    description: ['', [V.required, V.minLength(10), V.maxLength(100)]],
    imageURL: ['', []],
    category: this.fb.control<Category>(Category.COLORS, [V.required]),
    tags: this.fb.array([['TAG', [V.required, V.minLength(2)]]]),
  });
  public isUpdateView: boolean = false;
  private toolId: string | null = null;

  ngOnInit(): void {
    if (!this.router.url.includes('update')) return;
    this.isUpdateView = true;

    this.aRoute.params.subscribe(({ id }) => {
      this.toolsService.getOne(id).then((ans) => {
        this.toolId = id;
        this.toolForm.reset(ans.data());
        (this.toolForm.controls['tags'] as FormArray) = this.fb.array(
          (ans.data() as Tool).tags.map((tag) => [tag]),
        );
      });
    });
  }

  public onSubmit(): void {
    if (this.toolForm.invalid) return this.toolForm.markAllAsTouched();

    if (this.toolId) {
      this.toolsService
        .update(this.toolId, this.toolForm.value)
        .then(() => this.router.navigateByUrl('/tools/all'));
      return;
    }
    this.toolsService
      .create(this.toolForm.value)
      .then((ans) => console.log(ans));

    this.toolForm.reset();
    (this.toolForm.controls['tags'] as FormArray) = this.fb.array([
      ['TAG', [V.required, V.minLength(2)]],
    ]);
  }
  public showPreview(): void {
    this.toolsService.updatePreviewTool(this.toolForm.value);
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
