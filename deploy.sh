#!/usr/bin/env sh

set -e

echo "Building Hugo site..."
hugo

echo "Deploying to GitHub Pages..."
cd public
git init
git add -A
git commit -m "Deploy to GitHub Pages"
git push -f git@github.com:perhapslol/blog.git master:gh-pages
cd ..
