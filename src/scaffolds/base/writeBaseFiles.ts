import { Options } from '../types';
import { createDirectory, writeFile } from '../../utils/writeHelpers';
import { prettierConfig } from '../../scaffolds/globals/prettier.scaffold';
import { lintConfig } from '../../scaffolds/globals/eslint.scaffold';
import { gitignore, jestConfig } from '../globals';

export const writeBaseFiles = async (options: Options) => {
  const { projectFeatures } = options;

  await createDirectory('src');

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
};
