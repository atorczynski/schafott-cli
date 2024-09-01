# schafott-cli

Scaffold CLI is a command line tool to generate scaffolds for your projects. It takes away the pain of creating the same files and folders over and over again for every new library project you start. Also it comes with ready-to-use configurations for TypeScript, Prettier, ESLint, Standard and Changesets so you can focus on writing code.

## Installation
Install the CLI globally to use it from anywhere.

```bash
npm install -g schafott-cli
```

## Usage
Run the CLI in the directory where you want to create the scaffold or provide a path when running the CLI.

```bash
schafott
```

Table of Contents
=================

   * [schafott-cli](#schafott-cli)
      * [Installation](#installation)
      * [Usage](#usage)
      * [NodeJS / Browser Utility Library](#nodejs--browser-utility-library)
         * [Features](#features)
         * [Predefined Scripts](#predefined-scripts)
      * [License](#license)

Current supported scaffolds:
- [x] NodeJS / Browser Utility Library
- [ ] React Component Library
- [ ] Angular Component Library
- [ ] Vue Component Library

## NodeJS / Browser Utility Library
Generates a scaffold for a NodeJS / Browser Utility Library.

### Features
- [x] [TypeScript](https://github.com/microsoft/TypeScript) (Language)
- [x] [Prettier](https://github.com/prettier/prettier) (Code Formatter)
- [x] [ESLint](https://github.com/eslint/eslint) (Code Linter)
- [x] [Standard](https://github.com/standard/standard) (Code Style)
- [x] [Changesets](https://github.com/changesets/changesets) (Versioning)
- [ ] [Jest](https://github.com/jestjs/jest) (Testing)

Please note that the generated scaffold is a starting point and should be adjusted to your needs.

### Predefined Scripts
- `dev` - Starts the development server
- `build` - Builds the library

## React Component Library (WIP) - no release yet
Generates a scaffold for a React Component Library.

### Features

### Predefined Scripts
- `dev` - Starts the development server
- `build` - Builds the library



## License
MIT

