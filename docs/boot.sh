#!/bin/bash

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
