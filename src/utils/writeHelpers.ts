import fs from 'fs/promises';
import chalk from 'chalk';
import { log } from './helpers';

export const writeFile = async (path: string, data: string) => {
  await fs
    .writeFile(path, data)
    .then(() => {
      log(chalk.green('CREATED') + ` ${path}`);
    })
    .catch((err) => {
      log(chalk.red(err));
      process.exit(1);
    });
};

export const createDirectory = async (path: string) => {
  await fs
    .mkdir(path, { recursive: true })
    .then(() => {
      log(chalk.green('CREATED DIR') + ` ${path}`);
    })
    .catch((err) => {
      log(chalk.red(err));
      process.exit(1);
    });
};
