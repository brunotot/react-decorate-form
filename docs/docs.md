Generate new local workspace commands
- ng new {workspace-name} --create-application=false
- ng generate library {library-name}
- ng generate application {application-name}

--> Move public-api.ts file to the library root

--> {library-name}/package.json
{
  "ngPackage": {
    "schema": "./../node_modules/ng-packagr/ng-package.schema.json",
    "lib": {
      cssUrl": "inline",
      entryFile": "public-api.ts"
    },
    assets": [
      assets/**"
    ],
    "dest": "dist"
  }
}
  
--> tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@angular/*": [
        "./node_modules/@angular/*"
      ],
      "ngx-painless-form": [
        "projects/ngx-painless-form/dist"
      ]
    }
  }
}
