import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayUppercase',
})
export class ArrayUppercasePipe implements PipeTransform {
  transform(value: string[]): string[] {
    return value.map((s) => s.toUpperCase());
  }
}
