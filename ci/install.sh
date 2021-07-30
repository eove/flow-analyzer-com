#!/usr/bin/env bash

set -e

main() {
  local secret="$1"
  prepare_authentication "${secret}"
  npm install --no-progress
  npm run bootstrap
}

prepare_authentication() {
  local secret="$1"
  prepare_directory . "${secret}"
  for directory in packages/*/ ; do
    prepare_directory "${directory}" "${secret}"
  done
}

prepare_directory() {
  local directory="$1"
  local secret="$2"
  echo "Preparing authentication in ${directory}"
  echo "//npm.pkg.github.com/:_authToken=${secret}" > "${directory}/.npmrc"
  echo "registry=https://npm.pkg.github.com/eove" >> "${directory}/.npmrc"
}

main "$@"