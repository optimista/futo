#!/bin/bash

futo-package-init()
{
  name=$1
  git clone git@github.com:optimista/react-npm-boilerplate.git $name && cd $name && rm README.md
  sed -i "s/react-npm-boilerplate/$name/g" package.json # change package name
	sed -i "s/\(\"description\": \"\)[^\"]*\"/\1${name^} is...\"/" package.json
  npm install
}
