#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ESM_LIB_DIR="${SCRIPT_DIR}/dreams-web-sdk"

[[ -d "$ESM_LIB_DIR" ]] || ln -s "$SCRIPT_DIR/../../dist/esm" "$ESM_LIB_DIR"
npx http-server "$SCRIPT_DIR" -o
