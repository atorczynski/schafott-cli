import { select } from '@inquirer/prompts';
import fs from 'fs/promises';
import chalk from 'chalk';

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
