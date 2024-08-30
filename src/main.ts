#!/usr/bin/env node

import { input, select, Separator } from '@inquirer/prompts';

import chalk from 'chalk';
import { activatePathLib } from './utils/paths/lib.path.js';
import { log } from './utils/helpers';
import path from 'path';
import { validate } from './utils/validate.js';

const selected = await select({
  message: 'Package Type',
  choices: [
    { name: 'JS-Library', value: 'lib' },
    new Separator(),
    { name: 'cancel', value: 'cancel' },
  ],
});

if (selected === 'cancel') {
  process.exit(0);
}

const creationPath = await input({
  message: 'Where do you want to create the project?',
  default: '.',
});

const projectName = await input({
  message: 'Project-Folder Name',
});

if (!projectName) {
  log(chalk.red('Project-Folder Name is required'));
  process.exit(1);
}

const projectPath = path.join(creationPath, projectName);

await validate(path.join(process.cwd(), projectPath));

console.log(projectPath);

if (selected === 'lib') {
  activatePathLib(projectName);
}
