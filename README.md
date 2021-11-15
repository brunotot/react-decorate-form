# NgxPainlessForm

Agonising form creation made easy. Simply create fully responsive and validated forms within minutes. Angular v13

## Installation

1. Install dependencies
```
npm install jquery@3.5.x
npm install select2@4.0.x
npm install ng-select2@1.3.1
npm install bootstrap@5.1.3
npm install ngx-simple-form
```

2. Add styles to `angular.json`
```json
{
  "styles": [
    "node_modules/ngx-simple-form/assets/style.scss",
    "node_modules/select2/dist/css/select2.min.css"
  ]
}
```

3. Add scripts to `angular.json`
```json
{
  "scripts": [
    "node_modules/jquery/dist/jquery.js",
    "node_modules/select2/dist/js/select2.min.js"
  ]
}
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
import { Validators } from '@angular/forms';
import { 
  Form, 
  FormControlWrapper, 
  InputType,
  IForm,
  ISelect2MultipleId,
  ISelect2SingleId
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
  select2Multiple: { ids: ["1", "2"] } as ISelect2MultipleId,
  select2Single: { id: "1" } as ISelect2SingleId
}
```

### Form generation modeled by the form instance
```typescript
onSubmitFn = (value: IForm): any => console.log(value)
formTitle: string = 'Example title';
formInstance: Form = FormControlWrapper.builder(exampleFormValue)
  .set({
    key: 'id', 
    inputType: InputType.INPUT_HIDDEN
  })
  .set({
    key: 'datetime', 
    validatorConfigs: [{validator: Validators.required, message: 'Datetime required!', validatorName: 'required'}],
    inputType: InputType.INPUT_DATETIME,
    label: 'Datetime label',
    placeholder: 'Datetime placeholder'
  })
  .set({
    key: 'number', 
    validatorConfigs: [{validator: Validators.required, message: 'Number required!', validatorName: 'required'}],
    inputType: InputType.INPUT_NUMBER,
    label: 'Number label',
    placeholder: 'Number placeholder'
  })
  .set({
    key: 'text', 
    validatorConfigs: [{validator: Validators.required, message: 'Text required!', validatorName: 'required'}],
    inputType: InputType.INPUT_TEXT,
    label: 'Text label',
    placeholder: 'Text placeholder'
  })
  .set({
    key: 'textarea', 
    validatorConfigs: [{validator: Validators.required, message: 'Textarea required!', validatorName: 'required'}],
    inputType: InputType.INPUT_TEXTAREA,
    label: 'Textarea label',
    placeholder: 'Textarea placeholder'
  })
  .set({
    key: 'password', 
    validatorConfigs: [{validator: Validators.required, message: 'Password required!', validatorName: 'required'}],
    inputType: InputType.INPUT_PASSWORD,
    label: 'Password label',
    placeholder: 'Password placeholder'
  })
  .set({
    key: 'date', 
    validatorConfigs: [{validator: Validators.required, message: 'Date required!', validatorName: 'required'}],
    inputType: InputType.INPUT_DATE,
    label: 'Date label',
    placeholder: 'Date placeholder'
  })
  .set({
    key: 'checkbox', 
    validatorConfigs: [{validator: Validators.pattern('true'), message: 'Checkbox required!', validatorName: 'pattern'}],
    inputType: InputType.INPUT_CHECKBOX,
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
