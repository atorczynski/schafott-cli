import fs from 'fs';
import { writeFile } from '../../writeHelpers';
import { rollupConfigLib } from '../../../scaffolds/react-lib/rollup.config.react-lib.scaffold';

export const createReactFiles = async (tsConfigScaffold: object, pkgJson: object) => {
  await writeFile('src/index.ts', '');
  await writeFile('package.json', JSON.stringify(pkgJson, null, 2));
  await writeFile('rollup.config.mjs', rollupConfigLib);

  fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfigScaffold, null, 2));
};
