import pkgJson from '../../../scaffolds/react-lib/package.react-lib.scaffold.json';
import tsConfigJson from '../../../scaffolds/react-lib/tsconfig.react-lib.scaffold.json';
import { Options } from '../../../scaffolds/types';
import { installDeps } from '../../helpers';
import { createReactFiles } from './react-lib.structure.js';

export const generateReactFiles = async (options: Options) => {
  const { projectName, licence, projectFeatures, version, author, description } = options;

  const pkg = pkgJson;
  pkg.name = projectName;
  pkg.dependencies = {};
  pkg.version = version;
  pkg.license = licence;
  pkg.author = author;
  pkg.description = description;
  pkg.scripts = {
    ...pkg.scripts,
  };
  pkg.devDependencies = {
    ...pkg.devDependencies,
    ...(projectFeatures.includes('jest') && { jest: '^29.7.0' }),
    ...(projectFeatures.includes('jest') && { '@types/jest': '^29.5.12' }),
    ...(projectFeatures.includes('jest') && { 'ts-jest': '^29.2.5' }),
  };

  const deps = { ...pkg.devDependencies, ...pkg.dependencies };

  await createReactFiles(tsConfigJson, pkgJson);
  await installDeps(deps);
};
