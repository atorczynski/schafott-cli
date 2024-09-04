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
  pkg.scripts = {
    ...pkg.scripts,
    ...(projectFeatures.includes('jest') && { test: 'jest' }),
  };
  pkg.devDependencies = {
    ...pkg.devDependencies,
    ...(projectFeatures.includes('changesets') && { '@changesets/cli': '^2.27.7' }),
    ...(projectFeatures.includes('prettier') && { prettier: '^3.3.3' }),
    ...(projectFeatures.includes('jest') && { jest: '^29.7.0' }),
    ...(projectFeatures.includes('jest') && { '@types/jest': '^29.5.12' }),
    ...(projectFeatures.includes('jest') && { 'ts-jest': '^29.2.5' }),
  };

  await createLibFiles(tsConfigJson, pkgJson);

  await installDeps();
};
