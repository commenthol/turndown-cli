#!/usr/bin/env bash

CWD=$(cd -P -- "$(dirname -- "$0")" && pwd -P)

hasCmd () {
  type $1 > /dev/null 2>&1
  echo $?
}

buildPlugin () {
  cd "$CWD/../packages/turndown-plugin-gfm"
  if [[ 0 -eq $(hasCmd pnpm) ]]; then
    pnpm i
  else
    npm i
  fi
  npm t
}

copy () {
  cd "$CWD/.."
  cp "./packages/turndown-plugin-gfm/lib/turndown-plugin-gfm.cjs.js" "./turndown-plugin-gfm.js"
}

buildPlugin
copy


