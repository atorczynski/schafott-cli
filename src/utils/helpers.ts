import { select } from '@inquirer/prompts';
import fs from 'fs/promises';
import chalk from 'chalk';
import { exec } from 'child_process';
import ora from 'ora';

export const log = console.log;

interface Dependencies {
  [key: string]: string;
}

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

export const installDeps = async (deps: Dependencies) => {
  const hasChangesets = deps['@changesets/cli'];
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
      spinner.succeed(
        `Dependencies installed. ${hasChangesets ? 'Run `changeset init` to setup changesets' : ''}`,
      );
    });
  } else {
    log(chalk.green('Done, run `npm install` to install dependencies'));
  }
};

export const initGit = async () => {
  const initGit = await select({
    message: 'Initialize git repository?',
    choices: [
      { name: 'No', value: 'no' },
      { name: 'Yes', value: 'yes' },
    ],
    default: 'yes',
  });

  if (initGit === 'yes') {
    const spinner = ora('Initializing git repository').start();

    exec('git init', (error) => {
      if (error) {
        console.error(`exec error: ${error}`);
        spinner.fail('Failed to initialize git repository');
        return;
      }
      spinner.succeed('Git repository initialized');
    });
  } else {
    log(chalk.green('Git repository not initialized'));
  }
};
