import fs from 'fs';
import { createDirectory, writeFile } from '../../writeHelpers';
import { rollupConfigLib } from '../../../scaffolds/react-lib/rollup.config.react-lib.scaffold';
import { buttonExampleComponent } from '../../../scaffolds/react-lib/example-files/Button';
import { reactIndexExport } from '../../../scaffolds/react-lib/example-files/index.schafott';

export const createReactFiles = async (tsConfigScaffold: object, pkgJson: object) => {
  await writeFile('src/index.ts', reactIndexExport);
  await createDirectory('src/components');
  await writeFile('src/components/Button.tsx', buttonExampleComponent);
  await writeFile('package.json', JSON.stringify(pkgJson, null, 2));
  await writeFile('rollup.config.mjs', rollupConfigLib);

  fs.writeFileSync('tsconfig.json', JSON.stringify(tsConfigScaffold, null, 2));
};
