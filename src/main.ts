#!/usr/bin/env node

import { input, select, Separator } from '@inquirer/prompts';

import fs from 'fs';
import chalk from 'chalk';
import { activatePathLib } from './utils/paths/lib.path.js';
import { log } from './utils/helpers.ts';

const selected = await select({
  message: 'Package Type',
  choices: [
    { name: 'JS-Library', value: 'lib' },
    new Separator(),
    { name: 'cancel', value: 'cancel' },
  ],
});

const currentPathContent = fs.readdirSync('.');

if (currentPathContent.length > 0) {
  log(chalk.red('Current directory is not empty'));

  const projectName = await input({
    message: 'Project-Folder Name',
  });

  if (!projectName) {
    log(chalk.red('Project-Folder Name is required'));
    process.exit(1);
  }

  fs.mkdirSync(projectName);

  process.chdir(projectName);
}

if (selected === 'cancel') {
  process.exit(0);
}

if (selected === 'lib') {
  console.log('JS-Library selected');
  const pkgName = await input({
    message: 'Package Name',
  });

  activatePathLib(pkgName);
}
