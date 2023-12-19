import { Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectComponent } from '@shared/components';
import * as Rxjs from 'rxjs';
import { of } from 'rxjs';

describe('SelectComponent', () => {
  let component: SelectComponent = Injector.create({
    providers: [
      { provide: SelectComponent },
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: () => SelectComponent,
      },
    ],
  }).get(SelectComponent);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit()', () => {
    jest.spyOn(component, 'subscribeToClickOutsideOfSelect');

    component.ngAfterViewInit();

    expect(component.subscribeToClickOutsideOfSelect).toHaveBeenCalled();
  });

  describe('selectOption()', () => {
    it('should call onChange() and re-assign "currentValue" & "isMenuOpen"', () => {
      const mockOption = 'option';
      jest.spyOn(component, 'onChange');

      component.selectOption(mockOption);

      expect(component.currentValue).toEqual(mockOption);
      expect(component.isMenuOpen).toBeFalsy();
      expect(component.onChange).toHaveBeenCalled();
    });
  });

  describe('subscribeToClickOutsideOfSelect', () => {
    it('should call onTouched() and change the "isMenuOpen" attr', () => {
      const mockEvent = { target: 'uwu' };
      const mockSelect = {
        nativeElement: {
          contains: jest.fn().mockImplementation(() => false),
        },
      } as any;

      component.isMenuOpen = true;
      component.selectContainer = mockSelect;
      jest.spyOn(component, 'onTouched');
      jest.spyOn(Rxjs, 'fromEvent').mockImplementation(() => of(mockEvent));

      component.subscribeToClickOutsideOfSelect();

      expect(Rxjs.fromEvent).toHaveBeenCalled();
      expect(component.isMenuOpen).toBeFalsy();
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
