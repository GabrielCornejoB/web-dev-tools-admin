import { Component } from '@angular/core';

@Component({
  selector: 'tools-form-page',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent {
  // TODO: Fetch this data from db
  categories: string[] = ['icons', 'colors', 'generators'];

  // TODO: Fetch this data based on the selected category
  tags: string[] = ['CSS', 'SVG'];
}
