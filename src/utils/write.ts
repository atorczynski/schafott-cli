import fs from 'fs/promises';
import chalk from 'chalk';
import ora from 'ora';
import { input, select } from '@inquirer/prompts';
import { log } from './helpers';
import { gitignore, prettierConfig } from '../scaffolds/globals/index';

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

  const usePrettier = await select({
    message: 'Use Prettier',
    default: 'yes',
    choices: [
      { name: 'Yes', value: 'yes' },
      { name: 'No', value: 'no' },
    ],
  });

  const spinner = ora('Creating files \n').start();
  if (usePrettier === 'yes')
    await writeFile('.prettierrc', JSON.stringify(prettierConfig, null, 2));
  await writeFile('.gitignore', gitignore);
  await writeFile('LICENSE', license);
  spinner.succeed('Files created');
};
