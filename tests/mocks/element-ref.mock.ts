import { ElementRef } from '@angular/core';

/** Element ref mock used for testing attribute directives, is a partial object of the ElementRef class */
export const ElementRefMock: Partial<ElementRef> = {
  nativeElement: {
    className: '',
    placeholder: '',
  },
};
