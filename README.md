# gitxl

[![NPM Version](https://img.shields.io/npm/v/gitxl.svg?style=flat)](https://npmjs.org/package/gitxl)
[![Build Status](https://travis-ci.org/bbenoist/gitxl.svg?branch=master)](https://travis-ci.org/bbenoist/gitxl)
[![Greenkeeper badge](https://badges.greenkeeper.io/bbenoist/gitxl.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/bbenoist/gitxl/badge.svg?branch=master)](https://coveralls.io/github/bbenoist/gitxl?branch=master)

A handy tool to help working with Git repositories.

## Motivation

As working with complex Git repository structures (e.g. lot of dependencies between branches) can become very time consuming, I've decided to automatize complex operations with a tool based on a declarative configuration.

## Features

* Updates the local (i.e. in your repository `.git` directory) list of Git remotes.
* Apply merge dependency-chains between branches.

## Example

### HEAD Dependencies

Let's say that you have a Git repository with an extra Git remote named `scaffold` which has a `master` branch.
Locally, you'd like your own `master` to stay up-to-date with `scaffold` but also includes some of your own changes (e.g. a custom `README.md`).
You've assumed the fact that your own `master` branch will never be pulled on the `scaffold` remote.

When a change occurs on the `scaffold` upstream, it's necessary to merge again the branch you're depending on.

That's a job for gitxl! Let's add a `.gitxlrc.yml` file at the root of our Git repository:

```yml
remotes:
  scaffold: git@github.com:bbenoist/scaffold.git

depends:
  - scaffold/master
```

Then, all we have to do is call the `gitxl pull` command which will:

1. Search and read a configuration file in the current working directory.
2. Update the Git remotes with the entries listed in the configuration files and fetch them.
3. Merge each branch listed in `depends` into `HEAD` (i.e. the currently checked out branch).

### Branch Management

Take a Git repository with the following branches:

* `master` - The main release branch. This is where the official releases are committed.
* `develop` - The main development branches. This is where the next release is being developed.
* `feature/awesome` - A feature branch which will live as long as the feature is not ready for `develop`.

By reading their description, we can see that these branches have dependencies between them: `feature/awesome` depends on `develop` which depends on `master.

When a change occurs, it's necessary to reapply the dependency-chain by merging each branch in the correct dependency order.

That's a job for gitxl! Let's add a `.gitxlrc.yml` file at the root of our Git repository:

```yml
remotes:
  scaffold: git@github.com:bbenoist/scaffold.git

branches:
  master:
    track: scaffold/master
  develop:
    track: scaffold/develop
    merge:
      - master
  feature/awesome:
    track: scaffold/feature/awesome
    merge:
      - develop
```

Then, all we have to do is call the `gitxl apply-merge` command which will:

1. Search and read a configuration file in the current working directory.
2. Update the Git remotes with the entries listed in the configuration files and fetch them.
3. Merge each branch listed in `branches` with the ref present in their `track` property.
4. Merge `merge` entries into each branch by respecting the dependency-chain.

## Installation

### npm

```text
npm install -g gitxl
```

### yarn

```text
yarn global add gitxl
```

### Git Clone

```text
git clone https://github.com/bbenoist/gitxl.git
cd gitxl
npm link
```

## Usage

To read an up-to-date command-line usage of gitxl, visit [Command-Line Interface Documentation](doc/cli.md) or call `gitxl --help`.

## Configuration

As the tool is based on _[cosmiconfig](https://github.com/davidtheclark/cosmiconfig)_, gitxl configuration can be set using one of the following methods:

* a `gitxl` property at the root of `package.json`.
* a JSON or YAML, `.gitxlrc` file.
* a `.gitxlrc` file with the extensions .json, .yaml, .yml, or .js.
* a `gitxl.config.js` CommonJS module.

Cosmiconfig continues to search up the directory tree, checking each of these places in each directory, until it finds some acceptable configuration (or hits the home directory).

Complete API reference for gitxl configuration files can be read at [`doc/config.schema.md`](doc/config.schema.md). Corresponding _[json-schema](http://json-schema.org/)_ schemas can be seen at [`doc/config.schema.json`](doc/config.schema.json) (release) or [`src/config.schema.json`](src/config.schema.json) (development).

## Test

```text
npm run test
```

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for more information about our contributing guidelines.

## License

[MIT](LICENSE.md)
