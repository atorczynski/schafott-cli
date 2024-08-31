import fs from 'fs';
import { writeFile } from '../writeHelpers';
import { rollupConfigLib } from '../../scaffolds/npm-library/rollup.config.scaffold';

export const createFiles = async (tsConfigScaffold: object, pkgJson: object) => {
  fs.mkdirSync('src', { recursive: true });
  await writeFile('README.md', '# Project Title\n\nProject Description');
  await writeFile('src/index.ts', '');
  await writeFile('package.json', JSON.stringify(pkgJson, null, 2));
  await writeFile('rollup.config.mjs', rollupConfigLib);

  fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfigScaffold, null, 2));
};
