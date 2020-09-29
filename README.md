# flow-analyzer-com 

[![Build Status](https://github.com/eove/flow-analyzer-com/workflows/CI/badge.svg)](https://github.com/eove/flow-analyzer-com/actions?query=workflow%3ACI)

Collection of packages to communicate with gaz flow analyzers such as pf300 & citrex devices through serial port.

This is a monorepository, subprojects are in [packages](/packages) directory.

## Installation

Just clone repository:

```
git clone git@github.com:eove/flow-analyzer-com.git
```

Then [bootstrap](https://github.com/lerna/lerna/tree/master/commands/bootstrap#readme) with [lerna](https://github.com/lerna/lerna):

```
npm install
npm run bootstrap
```

## Packages

Available packages:

- [flow-analyzer-com-communicator](/packages/flow-analyzer-com-communicator): Facade to communicate with device
- [flow-analyzer-com-talk](/packages/flow-analyzer-com-talk): CLI to communicate with device

## Publishing

### Registry

Packages are published in Eove private npm registry hosted by Github.

All packages are associated to this repository. See [packages](https://github.com/eove/flow-analyzer-com/packages) page.

### How to publish

Versioning and publishing are handled by lerna with [publish](https://github.com/lerna/lerna/tree/master/commands/publish#readme) command.

We use [fixed version mode](https://github.com/lerna/lerna#fixedlocked-mode-default), in other words all packages are on the same version line.

For instance if version is `1.2.0`, use:

- `npx lerna publish patch`: to bump version to `1.2.1` and publish it
- `npx lerna publish major`: to bump version to `2.0.0` and publish it
- `npx lerna publish 1.2.0-dev.1`: to bump version to `1.2.0-dev.1` and publish it

## Development

### `npx lerna run` to run npm script in packages

Keep a terminal opened at project root to quickly run some lerna commands.

You can then use some commands targeting all projects:

- test all: `npx lerna run test` (or `npm test` thanks to a custom script)
- build all: `npx lerna run build`(or `npm build` thanks to a custom script)

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
