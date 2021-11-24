# NgxPainlessForm

Agonising form creation made easy. 
Simply create fully responsive and validated forms within minutes. 
Made with Angular v13 and Bootstrap 5 design.

## Installation

1. Install library dependency
```
npm install ngx-simple-form
```

2. Add module to local `module.ts`
```ts
// ...
import { NgxPainlessFormModule } from 'ngx-painless-form';
@NgModule({
  // ...
  imports: [
    NgxPainlessFormModule
  ]
})
export class AppModule { }
```

## Usage

### Component call in template file
```html
<ngxp-form
  [form]="formInstance"
  [formTitle]="formTitle"
  [fnSubmit]="onSubmitFn">
</ngxp-form>
```

### Important imports
```typescript
import { 
  Form, 
  FormControlWrapper, 
  InputType,
  IForm,
  Validators
} from 'ngx-simple-form';
```

### Example form instance retrieved from a database
```typescript
let exampleFormValue: IForm = {
  id: 1,
  date: new Date(),
  datetime: new Date(),
  number: 150.50,
  text: 'This is a text example',
  textarea: 'This is a text area example',
  password: 'password-example',
  checkbox: true,
  select2Multiple: b["1", "2"],
  select2Single: "1"
}
```

### Form generation modeled by the form instance
```typescript
onSubmitFn = (value: IForm): any => console.log(value)
formTitle: string = 'Example title';
formInstance: Form = FormControlWrapper.builder(exampleFormValue)
  .set({
    key: 'id', 
    inputType: InputType.HIDDEN
  })
  .set({
    key: 'datetime', 
    validatorConfigs: [{validator: Validators.required, message: 'Datetime required!', validatorName: 'required'}],
    inputType: InputType.DATETIME,
    label: 'Datetime label',
    placeholder: 'Datetime placeholder'
  })
  .set({
    key: 'number', 
    validatorConfigs: [{validator: Validators.required, message: 'Number required!', validatorName: 'required'}],
    inputType: InputType.NUMBER,
    label: 'Number label',
    placeholder: 'Number placeholder'
  })
  .set({
    key: 'text', 
    validatorConfigs: [{validator: Validators.required, message: 'Text required!', validatorName: 'required'}],
    inputType: InputType.TEXT,
    label: 'Text label',
    placeholder: 'Text placeholder'
  })
  .set({
    key: 'textarea', 
    validatorConfigs: [{validator: Validators.required, message: 'Textarea required!', validatorName: 'required'}],
    inputType: InputType.TEXTAREA,
    label: 'Textarea label',
    placeholder: 'Textarea placeholder'
  })
  .set({
    key: 'password', 
    validatorConfigs: [{validator: Validators.required, message: 'Password required!', validatorName: 'required'}],
    inputType: InputType.PASSWORD,
    label: 'Password label',
    placeholder: 'Password placeholder'
  })
  .set({
    key: 'date', 
    validatorConfigs: [{validator: Validators.required, message: 'Date required!', validatorName: 'required'}],
    inputType: InputType.DATE,
    label: 'Date label',
    placeholder: 'Date placeholder'
  })
  .set({
    key: 'checkbox', 
    validatorConfigs: [{validator: Validators.pattern('true'), message: 'Checkbox required!', validatorName: 'pattern'}],
    inputType: InputType.CHECKBOX,
    label: 'Checkbox label',
    placeholder: 'Checkbox placeholder'
  })
  .set({
    key: 'select2Single', 
    validatorConfigs: [{validator: Validators.required, message: 'Select2 single required!', validatorName: 'required'}],
    inputType: InputType.SELECT_SINGLE,
    label: 'Select2 single label',
    placeholder: 'Select2 single placeholder',
    select2Data: [
      {id: "1", text: "Text1"},
      {id: "2", text: "Text2"},
      {id: "3", text: "Text3"}
    ]
  })
  .set({
    key: 'select2Multiple', 
    validatorConfigs: [{validator: Validators.required, message: 'Select2 multiple required!', validatorName: 'required'}],
    inputType: InputType.SELECT_MULTIPLE,
    label: 'Select2 multiple label',
    placeholder: 'Select2 multiple placeholder',
    select2Data: [
      {id: "1", text: "Text1"},
      {id: "2", text: "Text2"},
      {id: "3", text: "Text3"}
    ]
  })
  .getForm()
```

## Form generation result
![alt text](https://github.com/brunotot/ngx-painless-form/blob/main/docs/form-example.png?raw=true)
