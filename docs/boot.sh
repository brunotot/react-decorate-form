#!/bin/bash
ng new workspace-ngx-rapid-interface-builder --no-create-application
cd workspace-ngx-rapid-interface-builder
rm -rf .git
ng generate library ngx-rapid-interface-builder
ng generate application ngx-rapid-interface-builder-test --style=scss --routing=false
npm install faker && npm install --save-dev @types/faker && npm install --save-dev @types/lodash
cd projects/ngx-rapid-interface-builder
rm -rfv * && rm -rfv .*
git clone https://github.com/brunotot/ngx-rapid-interface-builder.git .
npm install
npm run lib:build
unzip -o ./docs/app.zip -d ./../ngx-rapid-interface-builder-test/src
code ../../. && exit

