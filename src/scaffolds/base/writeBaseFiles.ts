import fs from 'fs';
import { Options } from '../types';
import { writeFile } from '../../utils/writeHelpers';
import { prettierConfig } from '../../scaffolds/globals/prettier.scaffold';
import { lintConfig } from '../../scaffolds/globals/eslint.scaffold';
import { exec } from 'child_process';
import { gitignore, jestConfig } from '../globals';

export const writeBaseFiles = async (options: Options) => {
  const { projectFeatures } = options;

  fs.mkdirSync('src', { recursive: true });

  await writeFile('README.md', '# Project Title\n\nProject Description');
  await writeFile('eslint.config.js', lintConfig);
  await writeFile('.gitignore', gitignore);

  if (projectFeatures.includes('prettier')) {
    await writeFile('.prettierrc', JSON.stringify(prettierConfig, null, 2));
  }
  if (projectFeatures.includes('jest')) {
    await writeFile('jest.config.js', jestConfig);
    await writeFile('src/index.test.ts', 'test("Test", () => {\n  expect(true).toBe(true);\n});');
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
    });
  }
};
