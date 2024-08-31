import { Options } from '../types';
import { writeFile } from '../../utils/writeHelpers';
import { prettierConfig } from '../../scaffolds/globals/prettier.scaffold';

export const writeBaseFiles = async (options: Options) => {
  const { projectFeatures } = options;

  if (projectFeatures.includes('prettier')) {
    await writeFile('.prettierrc', JSON.stringify(prettierConfig, null, 2));
  }
};
