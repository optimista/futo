#!/bin/bash

futo-package-remove()
{
  name=$1
  [ ! -d $name ] && cd ..
  rm -rf $name
}
