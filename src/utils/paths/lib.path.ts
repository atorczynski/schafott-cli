import { createDefaultFiles } from '../write.js';
import pkgJson from '../../scaffolds/npm-library/package.scaffold.json';
import tsConfigJson from '../../scaffolds/npm-library/tsconfig.scaffold.json';
import { createFiles } from './lib.structure.js';

export const activatePathLib = async (pkgName: string) => {
  const pkg = pkgJson;
  pkg.name = pkgName;

  await createDefaultFiles();
  await createFiles(tsConfigJson, pkgJson);
};
