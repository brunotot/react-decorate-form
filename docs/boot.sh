#!/bin/bash

# Create workspace
ng new workspace-ngx-input-annotations --no-create-application

# Change directory to created workspace
cd workspace-ngx-input-annotations

# Remove unnecessary git init folder
rm -rf .git

# Generate library for development
ng generate library ngx-input-annotations

# Generate testing application that will consume the library
ng generate application ngx-input-annotations-demo --style=scss --routing=false

# Install prepared dependencies for testing application
npm i @faker-js/faker reflect-metadata language-flag-colors
npm i @angular/material@13.3.0 @angular/cdk@13.3.0 @angular/animations@13.3.0 --save --force

# Change directory to created library
cd projects/ngx-input-annotations

# Remove all files from the auto-generated library
rm -rfv * && rm -rfv .*

# Clone the repository
git clone https://github.com/brunotot/ngx-input-annotations.git .

# Change directory to workspace root
cd ../../ & ng build ngx-input-annotations

# Unzip prepared testing files (app folder)
unzip -o ./docs/app.zip -d ./../ngx-input-annotations-demo/src
cp ./docs/index.html ../ngx-input-annotations-demo/src/

# Open Visual Studio Code in workspace directory
code ../../.
