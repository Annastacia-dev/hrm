# Zuri Health HRM System (Web Version)

## Prerequisites

- [Node.js](https://nodejs.org/en/download) (v18.15.0)+
- [Npm](https://www.npmjs.com/get-npm) (9.5.0)+
- [Typescript](https://www.typescriptlang.org/download)

## Getting started

This project is bootstrapped with Vite + React + Typescript

To install necessary dependencies

```bash
npm i
```

To start the application on your [localhost](http://localhost:5173/)

```bash
npm run dev
```

## Formatting and Linting

This project uses [Prettier](https://prettier.io/) for formatting and [ESLint](https://eslint.org/) for linting. To format your code, run:

```bash
npm run format
```

To lint your code, run:

```bash
npm run lint
```

Note: Prefix variables with an underscore\_ if you have declared them but not used them.
e.g. const \_variable = 'value';

## Git Hooks

This project uses [Husky](https://typicode.github.io/husky) to run git hooks. The following hooks are configured:

- pre-commit: Runs linting on staged files.
- pre-push: Runs a build to ensure the code compiles.
- commit-msg: Ensures the commit message follows the conventional commits rules.

## Commits

This project uses [commitlint](https://commitlint.js.org/#/) to ensure that commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
Check out `commitlint.config.js` for the configuration.
