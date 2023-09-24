import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators as V,
} from '@angular/forms';
import { ALL_CATEGORIES, Category } from '../../models/category.model';
import { FormService } from '../../services/form.service';
import { ToolsService } from '../../services/tools.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

type myFormArray = FormArray<FormControl<string | null>>;

@Component({
  selector: 'wdt-form-page',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private fs = inject(FormService);
  private aRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private toolsService = inject(ToolsService);

  public toolForm: FormGroup = this.fb.group({
    name: ['', [V.required, V.minLength(3), V.maxLength(30)]],
    author: ['', [V.required, V.minLength(3), V.maxLength(30)]],
    url: ['', [V.required, V.minLength(5)]],
    description: ['', [V.required, V.minLength(10), V.maxLength(100)]],
    imageURL: ['', []],
    category: this.fb.control<Category>('colors', [V.required]),
    tags: this.fb.array<FormControl<string | null>[]>([], [V.required]),
  });
  public isUpdateView: boolean = false;
  private toolId: string | null = null;

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    if (!this.router.url.includes('update')) return;
    this.isUpdateView = true;

    this.subscriptions.push(
      this.aRoute.params
        .pipe(switchMap(({ id }) => this.toolsService.getOne(id)))
        .subscribe((data) => {
          this.toolId = data.id;
          data.tags.forEach((tag) =>
            this.fs.addFieldToArray(this.tagsFormArray, tag),
          );
          this.toolForm.reset(data);
        }),
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public get categories(): string[] {
    return [...ALL_CATEGORIES];
  }

  public onSubmit(): void {
    if (this.toolForm.invalid) return this.toolForm.markAllAsTouched();

    if (this.toolId) {
      this.toolsService
        .update(this.toolId, {
          ...this.toolForm.value,
          tags: [...this.tagsFormArray.controls.map((c) => c.value)],
        })
        .then(() => this.router.navigateByUrl('/tools/all'));
      return;
    }
    this.toolsService
      .create(this.toolForm.value)
      .then((ans) => console.log(ans));

    this.toolForm.reset();
    this.tagsFormArray.clear();
  }

  // * Tags Array manipulation
  public get tagsFormArray(): myFormArray {
    return this.toolForm.get('tags') as myFormArray;
  }
  public onDeleteTag(i: number): void {
    this.fs.deleteFieldInArray(this.tagsFormArray, i);
  }
  public onAddTag(): void {
    this.fs.addFieldToArray(this.tagsFormArray);
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
    return this.fs.getErrorFromFieldInArray(this.tagsFormArray, i);
  }
  public isValidTag(i: number): boolean | null {
    return this.fs.isValidFieldInArray(this.tagsFormArray, i);
  }
}
