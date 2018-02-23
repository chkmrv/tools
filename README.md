# @chantelle/tools

[![CircleCI](https://circleci.com/gh/GroupeChantelle/tools.svg?style=shield)](https://circleci.com/gh/GroupeChantelle/tools)

Common tools for Groupe Chantelle

This package consists of
- [@chantelle/util](https://www.npmjs.com/package/@chantelle/util)
- [@chantelle/babel-preset-chantelle](https://www.npmjs.com/package/babel-preset-chantelle)
- [@chantelle/eslint-config-chantelle](https://www.npmjs.com/package/@chantelle/eslint-config-chantelle)
- [@chantelle/eslint-plugin-chantelle](https://www.npmjs.com/package/@chantelle/eslint-plugin-chantelle)
- [@chantelle/eslint-config-chantelle-commonjs](https://www.npmjs.com/package/@chantelle/eslint-config-chantelle-commonjs)
- [@chantelle/eslint-config-legacy](https://www.npmjs.com/package/@chantelle/eslint-config-legacy)
- [@chantelle/scripts (WIP)](https://www.npmjs.com/package/@chantelle/scripts)
- [@chantelle/config (WIP)](https://www.npmjs.com/package/@chantelle/config)
- [@chantelle/gulp-tasks (WIP)](https://www.npmjs.com/package/@chantelle/gulp-tasks)


## Installation

- ### `yarn && yarn bootstrap`


## Commands

- ### `yarn start`
Start deployment on all modules

- ### `yarn test`
Start test process on all modules

- ### `yarn bootstrap`
Installs all submodules and links them together

- ### `yarn publish-all` or `yarn run publish`
Set version, tag git version and after publish all modules to npm

- ### `yarn build`
Start build process on all modules

- ### `yarn lint`
Start lint process on all modules

- ### `yarn reinstall`
Purges all modules and installs everything

- ### `npm run reinstall`
Purges all modules and installs everything

- ### `yarn run exec <command>`
Run a command in all modules

- ### `yarn purge`
Purge all installed modules

- ### `yarn clean`
Clean all modules installed in submodules

- ### `yarn purge`
Purge all installed modules and lock files
