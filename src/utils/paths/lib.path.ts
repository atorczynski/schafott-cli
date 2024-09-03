import pkgJson from '../../scaffolds/npm-library/package.scaffold.json';
import tsConfigJson from '../../scaffolds/npm-library/tsconfig.scaffold.json';
import { Options } from '../../scaffolds/types';
import { installDeps } from '../helpers';
import { createLibFiles } from './lib.structure.js';

export const generateLibFiles = async (options: Options) => {
  const { projectName, licence, projectFeatures, version, author, description } = options;

  const pkg = pkgJson;
  pkg.name = projectName;
  pkg.version = version;
  pkg.license = licence;
  pkg.author = author;
  pkg.description = description;
  pkg.devDependencies = {
    ...pkg.devDependencies,
    ...(projectFeatures.includes('changesets') && { '@changesets/cli': '^2.27.7' }),
  };

  await createLibFiles(tsConfigJson, pkgJson);

  await installDeps();
};
