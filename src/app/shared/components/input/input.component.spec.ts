import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputComponent } from './input.component';
import { Injector } from '@angular/core';

describe('InputComponent', () => {
  let component: InputComponent = Injector.create({
    providers: [
      { provide: InputComponent },
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: () => InputComponent,
      },
    ],
  }).get(InputComponent);

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
      component.value = 'test value';
      jest.spyOn(component, 'onTouched');

      component.onBlur();

      expect(component.onTouched).not.toHaveBeenCalled();
    });

    it('should call onTouched() when the "value" attr is falsy', () => {
      component.value = '';
      jest.spyOn(component, 'onTouched');

      component.onBlur();

      expect(component.onTouched).toHaveBeenCalled();
    });
  });

  describe('CVA Functions', () => {
    it('should re-assign the "value" attr', () => {
      component.writeValue('test');
      expect(component.value).toEqual('test');
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
