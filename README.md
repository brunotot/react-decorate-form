<h1 align="center">:rocket: TypeScript Decorator Validation - React Implementation :rocket:</h1>

<p align="center">:star: Class entity validations made easy with the help of 
 <a href="https://www.typescriptlang.org/docs/handbook/decorators.html">@Decorators</a>
</p>
<p align="center">:star: Allows strict type checking when applying decorator validators</p>
<p align="center">:star: Works perfectly with existing TypeScript-first applications</p>

<p align="center">
 <a href="https://npmcharts.com/compare/react-decorate-form?minimal=true">
  <img alt="Downloads per month" src="https://img.shields.io/npm/dm/react-decorate-form" height="20"/>
 </a>
 
 <a href="https://www.npmjs.com/package/react-decorate-form">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/react-decorate-form.svg" height="20"/>
 </a>
 
 <a href="https://github.com/brunotot/react-decorate-form/graphs/contributors">
  <img alt="Contributors" src="https://img.shields.io/github/contributors/brunotot/react-decorate-form" height="20"/>
 </a>
 
 <a href="https://github.com/brunotot/react-decorate-form/graphs/commit-activity">
  <img alt="Maintained" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" height="20"/>
 </a>
 
 <a href="#">
  <img alt="Awesome badge" src="https://awesome.re/badge.svg" height="20"/>
 </a>
 
 <h2 align="center">
  <a href="https://stackblitz.com/edit/react-ts-d3swd2?file=src%2FApp.tsx&file=src%2Fmodel%2FUserForm.ts">STACKBLITZ DEMO</a>
 </h2>
</p>

## Table of Contents

- [Installation](#installation)
- [Contribute](#contribute)
- [Documentation](#documentation)
- [Examples](#examples)

## Installation

1. Install library dependency
```
npm install react-decorate-form
```
2. Allow experimental decorators configuration in your `tsconfig.json`. 
   <br>This removes IDE errors which could pop-up
```ts
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    /* ... */
  }
}
```
3. Add babel configuration to your `tsconfig.json`.
   <br>This allows for type-safety checking
```ts
{
  plugins: [
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ],
  presets: ["@babel/preset-typescript"],
}
```

## Contribute

1. Open bash terminal
2. Change directory to your desired position
3. Prepare the environment using this command
```bash
bash <(curl -s https://raw.githubusercontent.com/brunotot/react-decorate-form/master/contribute/setup.sh)
```
Expanded shell code:
```bash
#!/bin/bash
mkdir typescript-decorator-validation-dev
cd typescript-decorator-validation-dev
git clone https://github.com/brunotot/react-decorate-form.git
cd react-decorate-form
npm install
cd ../
git clone https://github.com/brunotot/react-decorate-form.git demo
cd demo
git checkout testing
npm install
cd ../
if command -v code; then
    code .
fi
```
4. Commit and push changes to a local branch
5. Open pull request

## Documentation

See extended documentation on [typescript-decorator-validation](https://github.com/brunotot/typescript-decorator-validation#readme)

## Examples

A basic TypeScript form can look something like
```typescript
import { validators } from 'react-decorate-form';

export type UserFormFields = {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  password: string;
  url: string;
  age: number;
};

export default class UserForm implements UserFormFields {
  @validators.string.Size({ min: 5 })
  @validators.string.NotEmpty()
  firstName!: string;

  @validators.string.NotEmpty()
  lastName!: string;

  @validators.string.NotEmpty()
  @validators.string.Password()
  password!: string;

  confirmPassword!: string;

  @validators.string.URL()
  url!: string;

  @validators.number.Range({ min: 18, max: 100 })
  age!: number;

  @validators.boolean.AssertTrue('Passwords must match')
  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
}
```
And with some styling we can display the form which can look something like:

![example form](https://github.com/brunotot/typescript-decorator-validation/blob/main/assets/img/example-form-screenshot.png?raw=true)
