#!/usr/bin/env bash

version=$(cat package.json | grep version | head -1 | awk -F\" '{ print $4 }');
cd dist
zip -r9 "../$version.zip" .