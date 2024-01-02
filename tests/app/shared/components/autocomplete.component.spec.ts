import { DestroyRef } from '@angular/core';
import * as Rxjs from 'rxjs';

import { AutocompleteComponent } from '@shared/components';
import { DestroyRefMock } from '@tests/mocks';
import { of } from 'rxjs';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let destroyRef: DestroyRef = DestroyRefMock;

  beforeEach(() => {
    component = new AutocompleteComponent(destroyRef);
    component.options = ['Option 1', 'Option 2', 'Yeh'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should set the "filteredOptions" attr with the "options" attr value', () => {
      expect(component.filteredOptions.length).toEqual(0);

      component.ngOnInit();

      expect(component.filteredOptions).toEqual(component.options);
    });
  });

  describe('ngAfterViewInit()', () => {
    it('should call the subscribeToClickOutsideOfElement() fn', () => {
      jest.spyOn(component, 'subscribeToClickOutsideOfElement');

      component.ngAfterViewInit();

      expect(component.subscribeToClickOutsideOfElement).toHaveBeenCalled();
    });
  });

  describe('onInputWrite()', () => {
    it('should call the onChange() fn with an empty value and set the "filteredOptions" attr to the original value if the "currentValue" attr is null', () => {
      jest.spyOn(component, 'onChange');
      component.filteredOptions = ['Yeh'];
      component.currentValue = null;

      component.onInputWrite();

      expect(component.onChange).toHaveBeenCalledWith('');
      expect(component.filteredOptions).toEqual(component.options);
    });

    it('should call the onChange() and filterOptions() fns if the "currentValue" attr is not null', () => {
      jest.spyOn(component, 'onChange');
      jest.spyOn(component, 'filterOptions');
      component.currentValue = 'YE';

      component.onInputWrite();

      expect(component.onChange).toHaveBeenCalledWith('YE');
      expect(component.filterOptions).toHaveBeenCalledWith('YE'.toLowerCase());
    });
  });

  describe('selectOption()', () => {
    it('should call the onChange() fn and set the "currentValue", "filteredOptions" and "isMenuOpen" attrs', () => {
      jest.spyOn(component, 'onChange');

      component.selectOption(component.options[1]);

      expect(component.onChange).toHaveBeenCalledWith(component.options[1]);
      expect(component.currentValue).toEqual(component.options[1]);
      expect(component.filteredOptions).toEqual(
        component.filterOptions(component.options[1]),
      );
      expect(component.isMenuOpen).toBeFalsy();
    });
  });

  describe('emitValue()', () => {
    it('should emit the "currentValue" attr if it is truthy', () => {
      jest.spyOn(component.buttonClicked, 'emit');
      component.currentValue = 'A value';

      component.emitValue();

      expect(component.buttonClicked.emit).toHaveBeenCalledWith('A value');
    });

    it('should not emit anything if the "currentValue" attr is falsy', () => {
      jest.spyOn(component.buttonClicked, 'emit');
      component.currentValue = '';

      component.emitValue();

      expect(component.buttonClicked.emit).not.toHaveBeenCalled();
    });

    it('should call the onChange() fn and reset the "currentValue", "filteredOptions" and "isMenuOpen" attrs', () => {
      jest.spyOn(component, 'onChange');

      component.emitValue();

      expect(component.onChange).toHaveBeenCalledWith('');
      expect(component.currentValue).toBeFalsy();
      expect(component.filteredOptions).toEqual(component.options);
      expect(component.isMenuOpen).toBeFalsy();
    });
  });

  describe('subscribeToClickOutsideOfElement()', () => {
    it('should uwu', () => {
      jest.spyOn(component, 'onTouched');
      jest.spyOn(Rxjs, 'fromEvent').mockImplementation(() => of(mockEvent));

      const mockEvent = { target: 'uwu' };
      const mockElement = {
        nativeElement: {
          contains: jest.fn().mockImplementation(() => false),
        },
      } as any;
      component.isMenuOpen = true;
      component.container = mockElement;

      component.subscribeToClickOutsideOfElement();

      expect(Rxjs.fromEvent).toHaveBeenCalled();
      expect(component.isMenuOpen).toBeFalsy();
      expect(component.onTouched).toHaveBeenCalled();
    });
  });

  describe('filterOptions()', () => {
    it('should filter options while being case insensitive', () => {
      const result = component.filterOptions('o');

      expect(result).toEqual(['Option 1', 'Option 2']);
    });
  });
});
