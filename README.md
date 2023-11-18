# Chrome Extension TypeScript Starter

![build](https://github.com/chibat/chrome-extension-typescript-starter/workflows/build/badge.svg)

Chrome Extension, TypeScript

## Prerequisites

- [node + yarn](https://nodejs.org/) (Current Version)

## Includes the following

- TypeScript
- Webpack
- React
- Jest

## Project Structure

- src/entrypoints: application entry points
- src/widgets: compositional layer to combine entities and features into meaningful blocks
- src/assets: static files
- src/shared: reusable functionality, detached from the specifics of the project/business
- public: manifest etc. for the extension to work
- dist: Chrome Extension directory
- dist/js: Generated JavaScript files

## Setup

```
yarn install
```

## Build

```
yarn build
```

## Build in watch mode

### terminal

```
yarn watch
```

## Load extension to chrome

Load `dist` directory

## Test

`npx jest` or `yarn test`
