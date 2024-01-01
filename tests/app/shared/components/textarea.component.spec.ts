import { Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { TextareaComponent } from '@shared/components';

describe('TextareaComponent', () => {
  let component: TextareaComponent = Injector.create({
    providers: [
      { provide: TextareaComponent },
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: () => TextareaComponent,
      },
    ],
  }).get(TextareaComponent);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInputWrite()', () => {
    it('should call onChange()', () => {
      jest.spyOn(component, 'onChange');
      const event = { target: { value: 'test' } } as any;
      component.onInputWrite(event);

      expect(component.onChange).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('should not call onTouched() when the "value" attr is truthy', () => {
      component.currentValue = 'test value';
      jest.spyOn(component, 'onTouched');

      component.onBlur();

      expect(component.onTouched).not.toHaveBeenCalled();
    });

    it('should call onTouched() when the "value" attr is falsy', () => {
      component.currentValue = '';
      jest.spyOn(component, 'onTouched');

      component.onBlur();

      expect(component.onTouched).toHaveBeenCalled();
    });
  });

  describe('CVA Functions', () => {
    it('should re-assign the "value" attr', () => {
      component.writeValue('test');
      expect(component.currentValue).toEqual('test');
    });

    it('should re-assign the "onChange" attr', () => {
      const mockFn = (value: string) => {};
      component.registerOnChange(mockFn);
      expect(component.onChange).toEqual(mockFn);
    });

    it('should re-assign the "onTouched" attr', () => {
      const mockFn = () => {};
      component.registerOnTouched(mockFn);
      expect(component.onTouched).toEqual(mockFn);
    });
  });
});
