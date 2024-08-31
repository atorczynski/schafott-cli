import pkgJson from '../../scaffolds/npm-library/package.scaffold.json';
import tsConfigJson from '../../scaffolds/npm-library/tsconfig.scaffold.json';
import { createFiles } from './lib.structure.js';
import { Options } from '../../scaffolds/types.js';

export const activatePathLib = async (options: Options) => {
  const { projectName, licence, projectFeatures } = options;

  const pkg = pkgJson;
  pkg.name = projectName;
  pkg.license = licence;
  pkg.author = 'Your Name';
  pkg.description = 'Your Description';
  pkg.devDependencies = {
    ...pkg.devDependencies,
    ...(projectFeatures.includes('changesets') && { '@changesets/cli': '^2.27.7' }),
  };

  await createFiles(tsConfigJson, pkgJson);
};
