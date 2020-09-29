# flow-analyzer-com 

[![Build Status](https://github.com/eove/flow-analyzer-com/workflows/CI/badge.svg)](https://github.com/eove/flow-analyzer-com/actions?query=workflow%3ACI)

Collection of packages to communicate with gaz flow analyzers such as pf300 & citrex devices through serial port.

This is a monorepository, subprojects are in [packages](/packages) directory.

## Packages

Available packages:

- [flow-analyzer-com-communicator](/packages/flow-analyzer-com-communicator): Facade to communicate with device
- [flow-analyzer-com-talk](/packages/flow-analyzer-com-talk): CLI to communicate with device

## For developers

### Installation

Just clone repository:

```
git clone https://github.com/eove/javascript.git
```

Then [bootstrap](https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme) with [lerna](https://github.com/lerna/lerna):

```
npm install
npm run bootstrap
```

### Publishing

Packges are published on:

- [npmjs.org](https://www.npmjs.com/settings/eove/packages)
- [github.com](https://github.com/orgs/eove/packages?repo_name=javascript)

Use the following command to publish to npmjs.org:

```
npx lerna publish <version>
```

Then publish packages to github.com with:

```
npx lerna publish from-package --registry https://npm.pkg.github.com
```

### Tests

To run tests:

```
npm test
```

This can be used in any package or in root directory (which will run tests in all packages).

To run test in an isolated docker container:

```
DOCKER_BUILDKIT=1 docker build -f ci/Dockerfile .
```

Sometimes tests work on your computer but not on CI.
Running tests in a container is close enough to CI and helps debug a slight variation between different envs.

### Link packages to speed up feedbacks

You can use `npx lerna link` to create symlinks for all packages so you can modify a dependency and use it without publishing it (or modifying your `node_modules` by hand).

Beware that when you install any dependency a symlink can be broken, so run link command again if any doubt.
