import { Options } from '../types';
import { writeFile } from '../../utils/writeHelpers';
import { prettierConfig } from '../../scaffolds/globals/prettier.scaffold';
import { exec } from 'child_process';

export const writeBaseFiles = async (options: Options) => {
  const { projectFeatures } = options;

  await writeFile('README.md', '# Project Title\n\nProject Description');

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
