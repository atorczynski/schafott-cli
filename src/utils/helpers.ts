import { select } from '@inquirer/prompts';
import fs from 'fs/promises';
import chalk from 'chalk';
import { exec } from 'child_process';
import ora from 'ora';

export const log = console.log;

export const validatePath = async (projectPath: string) => {
  if (
    await fs
      .access(projectPath)
      .then(() => true)
      .catch(() => false)
  ) {
    const overwriteProjectFolder = await select({
      message: 'Directory already exists, overwrite?',
      choices: [
        { name: 'No', value: 'no' },
        { name: 'Yes', value: 'yes' },
      ],
    });

    if (overwriteProjectFolder === 'no') {
      log(chalk.red('Aborted'));
      process.exit(0);
    }

    if (overwriteProjectFolder === 'yes') {
      await fs.rm(projectPath, { recursive: true });
      await fs.mkdir(projectPath, { recursive: true });
      await process.chdir(projectPath);
    }
  }

  await fs.mkdir(projectPath, { recursive: true });
  await process.chdir(projectPath);
};

export const installDeps = async () => {
  const installDeps = await select({
    message: 'Install dependencies using npm?',
    choices: [
      { name: 'No', value: 'no' },
      { name: 'Yes', value: 'yes' },
    ],
    default: 'yes',
  });

  if (installDeps === 'yes') {
    const spinner = ora('Installing dependencies').start();

    exec('npm install', (error) => {
      if (error) {
        console.error(`exec error: ${error}`);
        spinner.fail('Failed to install dependencies');
        return;
      }
      spinner.succeed('Dependencies installed');
    });
  } else {
    log(chalk.green('Done, run `npm install` to install dependencies'));
  }
};
