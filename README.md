 <h1 align="center">:rocket: React Decorate Form :rocket:</h1>

<p align="center">:rocket: Form validations made easy with the help of decorators</p>
<p align="center">:zap: Allows strict type checking when applying validators</p>
<p align="center">:star: Works perfectly with existing React form components</p>
<h2 align="center">
  <a href="https://stackblitz.com/edit/react-ts-d3swd2?file=src%2FApp.tsx&file=src%2Fmodel%2FUserForm.ts">STACKBLITZ DEMO</a>
</h2>

## Installation

1. Install library dependency

```
npm install react-decorate-form
```

2. Allow experimental decorators configuration in your `tsconfig.json`. This removes IDE errors which could pop-up :zap:
```ts
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    /* ... */
  }
}
```

3. Add babel configuration to your `tsconfig.json`. This allows for type-safety checking :star:

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
