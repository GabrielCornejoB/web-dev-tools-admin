import { FormBuilder } from '@angular/forms';
import { Tool } from '@core/models';
import { FormBuilderMock } from '@tests/mocks';
import { CreateToolPageComponent } from '@tools/pages/create-tool-page/create-tool-page.component';

describe('CreateToolPageComponent', () => {
  let component: CreateToolPageComponent;
  let formBuilder: FormBuilder;

  const validFormValue = {
    name: 'My Tool',
    category: 'Icons',
    description: 'This is a valid tool',
    url: 'https://www.google.com',
    author: 'Kanye West',
    tag: 'Tag',
  };
  const invalidFormValue = {
    name: '',
    category: 'Fonts',
    description: '',
    url: '',
    author: '',
    tag: '',
  };

  function setFormAsInvalid() {
    formBuilder = FormBuilderMock(invalidFormValue, 'invalid');
    component = new CreateToolPageComponent(formBuilder);
  }

  beforeEach(() => {
    formBuilder = FormBuilderMock(validFormValue, 'valid');
    component = new CreateToolPageComponent(formBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('onSubmit()', () => {
  //   it('should set the error "noTags" to the tag form field if the "tags" attr length is 0', () => {
  //     setFormAsInvalid();

  //     component.onSubmit();

  //     console.log(component.toolForm.controls['tag'].errors);
  //     // expect()
  //   });
  // });
});
