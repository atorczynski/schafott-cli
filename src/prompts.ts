import { checkbox, input, select, Separator } from '@inquirer/prompts';
import chalk from 'chalk';
import { log } from './utils/helpers';

export const prompts = async () => {
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

  const targetDirectory = await input({
    message: 'Where do you want to create the project?',
    default: '.',
  });

  const projectName = await input({
    message: 'Project-Folder Name',
  });

  const version = await input({
    message: 'Version',
    default: '0.0.1',
  });

  const description = await input({
    message: 'Description',
    default: 'Your Description',
  });

  const author = await input({
    message: 'Author',
    default: 'Your Name',
  });

  const licence = await input({
    message: 'Licence',
    default: 'MIT',
  });

  if (!projectName) {
    log(chalk.red('Project-Folder Name is required'));
    process.exit(1);
  }

  const projectFeatures = await checkbox({
    message: 'Select Features',
    choices: [
      { name: 'Prettier', value: 'prettier' },
      { name: 'Changesets', value: 'changesets' },
      { name: 'Jest', value: 'jest' },
    ],
  });

  return {
    selected,
    targetDirectory,
    projectName,
    projectFeatures,
    licence,
    version,
    description,
    author,
  };
};
