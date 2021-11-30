# NgxPainlessForm

🚀 Agonising form creation made easy. 
Simply create fully responsive and validated forms within minutes. 
Made with Angular v13 and Bootstrap 5 design.
Fully responsive for screen widths 250px and higher! 🚀

## Contribution
### Environment setup
1. Open command line
2. Position CLI location to desired folder
3. Execute following instructions or simply execute prepared shell script:
```
wget https://raw.githubusercontent.com/brunotot/ngx-rapid-interface-builder/8d805c12d3ab3ad02e773f55984ca9f127269e95/docs/boot.sh -O - | sh
```
```sh
# Create workspace
ng new workspace-ngx-rapid-interface-builder --no-create-application

# Change directory to created workspace
cd workspace-ngx-rapid-interface-builder

# Remove unnecessary git init folder
rm -rf .git

# Generate library for development
ng generate library ngx-rapid-interface-builder

# Generate testing application that will consume the library
ng generate application ngx-rapid-interface-builder-test --style=scss --routing=false

# Install prepared dependencies for testing application
npm install faker && npm install --save-dev @types/faker && npm install --save-dev @types/lodash

# Change directory to created library
cd projects/ngx-rapid-interface-builder

# Remove all files from the auto-generated library
rm -rfv * && rm -rfv .*

# Clone the repository
git clone https://github.com/brunotot/ngx-rapid-interface-builder.git .

# Install everything from package.json
npm install

# Run library build
npm run lib:build

# Unzip prepared testing files (app folder)
unzip -o ./docs/app.zip -d ./../ngx-rapid-interface-builder-test/src

# Open Visual Studio Code in workspace directory
code ../../.
```

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
import { Component } from '@angular/core'
import { 
  IForm, 
  Form, 
  FormControlWrapper, 
  Validators } 
from 'ngx-painless-form'
```

### Example form instance retrieved from a database
```typescript
let exampleFormValue: IForm = {
  id: "1",
  text: 'Thiasddsas',
  date: new Date("2025-07-01"),
  datetime: new Date("2025-07-01"),
  month: new Date("2025-07-01"),
  time: '03:20',
  number: 11,
  textarea: 'This is a text area example',
  password: 'password-example',
  email: 'test@test.com',
  color: '#000000',
  search: 'test',
  checkbox: false,
  url: 'http://www.example.com/index.html',
  phone: '+123/45-67890',
  week: '2021-W01',
  range: 60000,
  select2Multiple: ["1", "2"],
  select2Single: "1"
}
```

### Form generation modeled by the form instance
```typescript
@Component({ /* ... */ })
export class AppComponent {
  // Define what happens on submit
  onSubmitFn = (value: IForm): any => console.log(value)

  // Define optional form title
  formTitle: string = 'Example title';

  // Define form configuration
  formInstance: Form = new FormControlWrapper(exampleFormValue)
    .withHidden('id')
    .withText({
      formControlName: 'text', 
      label: 'Text label',
      placeholder: 'Text placeholder',
      validatorConfigs: [
        Validators.required('Text required!'),
        {message: 'At least 5 characters required!', isValid: v => v.length >= 5}
      ]
    })
    .withDateTime({
      formControlName: 'datetime',
      label: 'Datetime label',
      validatorConfigs: [
        Validators.required('Datetime required!'),
        {message: 'Year must be 2022 or above', isValid: d => d.getFullYear() >= 2022}
      ]
    })
    .withDate({
      formControlName: 'date', 
      label: 'Date label',
      validatorConfigs: [
        Validators.required('Date required!'), 
        {message: 'Date year must be above 2023', isValid: d => d.getFullYear() > 2023}
      ]
    })
    .withMonth({
      formControlName: 'month', 
      label: 'Month label',
      validatorConfigs: [
        Validators.required('Month required!'),
        {message: 'Month must be greater than April', isValid: d => (d as Date).getMonth() > 3}
      ]
    })
    .withTime({
      formControlName: 'time', 
      label: 'Time label',
      validatorConfigs: [
        Validators.required('Time required!'),
        {message: 'HH should be less than 4', isValid: t => t.hh < 4}
      ]
    })
    .withColor({
      formControlName: 'color', 
      label: 'Color label',
      validatorConfigs: [{message: 'Red has to be 0', isValid: c => c.rgb?.red === 0}]
    })
    .withNumber({
      formControlName: 'number', 
      label: 'Number label',
      placeholder: 'Number placeholder',
      validatorConfigs: [
        Validators.required('Number required!'), 
        {message: 'Number should be greater than 10', isValid: v => v > 10}
      ]
    })
    .withTextArea({
      formControlName: 'textarea', 
      label: 'Textarea label',
      placeholder: 'Textarea placeholder',
      validatorConfigs: [Validators.required('Textarea required!')]
    })
    .withPassword({
      formControlName: 'password', 
      label: 'Password label',
      placeholder: 'Password placeholder',
      validatorConfigs: [Validators.required('Password required!')]
    })
    .withEmail({
      formControlName: 'email', 
      label: 'Email label',
      placeholder: 'Email placeholder',
      validatorConfigs: [Validators.required('Email required!')]
    })
    .withSearch({
      formControlName: 'search', 
      label: 'Search label',
      validatorConfigs: [Validators.required('Search required!')]
    })
    .withUrl({
      formControlName: 'url', 
      label: 'URL label',
      placeholder: 'URL placeholder',
      validatorConfigs: [Validators.required('Url required!')]
    })
    .withCheckbox({
      formControlName: 'checkbox', 
      validatorConfigs: [{message: 'Checkbox must be false', isValid: c => !c}],
      label: 'Checkbox label'
    })
    .withSelectSingle({
      formControlName: 'select2Single', 
      label: 'Select2 single label',
      placeholder: 'Select2 single placeholder',
      data: [
        {id: '1', text: 'Option1'},
        {id: '2', text: 'Option2'},
        {id: '3', text: 'Option3'}
      ],
      validatorConfigs: [Validators.required('Select2 single required!')]
    })
    .withSelectMultiple({
      formControlName: 'select2Multiple', 
      label: 'Select2 multiple label',
      placeholder: 'Select2 multiple placeholder',
      data: [
        {id: '1', text: 'Option1'},
        {id: '2', text: 'Option2'},
        {id: '3', text: 'Option3'}
      ],
      validatorConfigs: [
        Validators.required('Select2 multiple required!'),
        {message: 'Select must have exactly 1 value', isValid: res => res.length === 1}
      ]
    })
    .withPhone({
      formControlName: 'phone', 
      label: 'Phone label',
      placeholder: 'Phone placeholder',
      validatorConfigs: [Validators.required('Phone required!')]
    })
    .withFileSingle({
      formControlName: 'file', 
      label: 'File label',
      validatorConfigs: [Validators.required('File required!')]
    })
    .withFileMultiple({
      formControlName: 'files', 
      multiple: true,
      label: 'Files multiple label',
      validatorConfigs: [
        Validators.required('Files multiple required!'),
        {message: 'There should be only one file', isValid: files => files?.length === 1}
      ]
    })
    .withWeek({
      formControlName: 'week', 
      label: 'Week label',
      validatorConfigs: [
        Validators.required('Week required!'),
        {message: 'Week must be 1', isValid: w => w.week === 1}
      ]
    })
    .withRange({
      formControlName: 'range', 
      label: 'Range label',
      min: 10000,
      max: 200000,
      validatorConfigs: [Validators.min(50000, 'You have to be at least 50000 years old!')]
    })
    .toForm();
}
```

## Form generation result
![Form generation result](https://github.com/brunotot/ngx-painless-form/blob/main/docs/form-example.png?raw=true)
