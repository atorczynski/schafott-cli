import { Options } from '../types';
import { writeFile } from '../../utils/writeHelpers';
import { prettierConfig } from '../../scaffolds/globals/prettier.scaffold';
import { lintConfig } from '../../scaffolds/globals/eslint.scaffold';
import { exec } from 'child_process';
import { gitignore } from '../globals';

export const writeBaseFiles = async (options: Options) => {
  const { projectFeatures } = options;

  await writeFile('README.md', '# Project Title\n\nProject Description');
  await writeFile('eslint.config.js', lintConfig);
  await writeFile('.gitignore', gitignore);

  if (projectFeatures.includes('prettier')) {
    await writeFile('.prettierrc', JSON.stringify(prettierConfig, null, 2));
  }

  if (projectFeatures.includes('changesets')) {
    exec('npx changeset init', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error initializing changesets: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Changesets stderr: ${stderr}`);
        return;
      }
      console.log(`Changesets stdout: ${stdout}`);
    });
  }
};
