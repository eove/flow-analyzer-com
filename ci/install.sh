#!/usr/bin/env bash

set -e

main() {
  echo "Installing root packages"
  npm install --no-progress
  echo "Bootstraping"
  npm run bootstrap
}

main "$@"