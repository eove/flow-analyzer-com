#!/usr/bin/env bash

set -e

main() {
  local secret="$1"
  prepare_authentication "${secret}"
  echo "Installing root packages"
  npm install --no-progress
  echo "Bootstraping"
  npm run bootstrap
}

prepare_authentication() {
  local secret="$1"
  echo "Preparing authentication in ."
  prepare_directory . "${secret}"
  for directory in packages/*/ ; do
    echo "Preparing authentication in ${directory}"
    prepare_directory "${directory}" "${secret}"
  done
}

prepare_directory() {
  local directory="$1"
  local secret="$2"
  echo "//npm.pkg.github.com/:_authToken=${secret}" > "${directory}/.npmrc"
  echo "registry=https://npm.pkg.github.com/eove" >> "${directory}/.npmrc"
  sed -i "s/ssh:\/\/git@github.com/https:\/\/${secret}:x-oauth-basic@github.com/g" "${directory}/package.json"
  sed -i "s/ssh:\/\/git@github.com/https:\/\/${secret}:x-oauth-basic@github.com/g" "${directory}/package-lock.json"
}

main "$@"