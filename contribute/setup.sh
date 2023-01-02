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