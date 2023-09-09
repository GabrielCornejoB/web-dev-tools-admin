import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayTitlecase',
})
export class ArrayTitlecasePipe implements PipeTransform {
  transform(value: string[]): string[] {
    return value.map(
      (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(),
    );
  }
}
