#!/usr/bin/env bash
git status
git add .
read -r -p "enter the commit  message:" context
git commit -m "$context"
git push origin main
