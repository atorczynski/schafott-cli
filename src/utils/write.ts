import fs from 'fs/promises';
import chalk from 'chalk';
import ora from 'ora';
import prettierlib from '../scaffolds/npm-library/prettier.scaffold.json';
import { input, select } from '@inquirer/prompts';
import { log } from './helpers.ts';
import { gitignore, lintConfig } from '../scaffolds/globals/index.ts';

export const writeFile = async (path: string, data: string) => {
  await fs
    .writeFile(path, data)
    .then(() => {
      log(chalk.green(`${path} created`));
    })
    .catch((err) => {
      log(chalk.red(err));
      process.exit(1);
    });
};

export const createDefaultFiles = async () => {
  const license = await input({
    message: 'License',
    default: 'MIT',
  });

  const useTests = await select({
    message: 'Use Tests',
    default: 'yes',
    choices: [
      { name: 'Yes', value: 'yes' },
      { name: 'No', value: 'no' },
    ],
  });

  const usePrettier = await select({
    message: 'Use Prettier',
    default: 'yes',
    choices: [
      { name: 'Yes', value: 'yes' },
      { name: 'No', value: 'no' },
    ],
  });

  const useLint = await select({
    message: 'Use Lint',
    default: 'yes',
    choices: [
      { name: 'Yes', value: 'yes' },
      { name: 'No', value: 'no' },
    ],
  });

  if (useLint === 'yes') {
    await writeFile('eslint.config.js', lintConfig);
  }

  const spinner = ora('Creating files \n').start();
  await writeFile('src/index.ts', '');
  if (usePrettier === 'yes') await writeFile('.prettierrc', JSON.stringify(prettierlib, null, 2));
  if (useTests === 'yes') await writeFile('src/index.test.js', '');
  await writeFile('.gitignore', gitignore);
  await writeFile('README.md', '# Project Title\n\nProject Description');
  await writeFile('LICENSE', license);
  spinner.succeed('Files created');
};
