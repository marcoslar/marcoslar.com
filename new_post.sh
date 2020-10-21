#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "usage ./new_post.sh FILE-NAME"
  exit 1
fi

read -d '' content << EOF
---
title = "$1"
---
EOF

now=$(date +"%Y-%m-%d")
filename=$now-$1.md

if [ ! -f ./posts/$filename ]; then
  touch ./posts/$filename
  echo "$content" >> ./posts/$filename
else
  echo "./posts/$filename already exists. Nothing was overwritten"
fi

