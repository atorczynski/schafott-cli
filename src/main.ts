#!/usr/bin/env node

import { generateLibFiles } from './utils/paths/lib.path.js';
import path from 'path';
import { prompts } from './prompts.js';
import { writeBaseFiles } from './scaffolds/base/writeBaseFiles.js';
import { validatePath } from './utils/helpers.js';

const {
  selected,
  targetDirectory,
  projectName,
  projectFeatures,
  licence,
  description,
  author,
  version,
} = await prompts();

const promptValues = {
  selected,
  targetDirectory,
  projectName,
  projectFeatures,
  licence,
  description,
  author,
  version,
} as const;

const projectPath = path.join(targetDirectory, projectName);

await validatePath(path.join(process.cwd(), projectPath));

await writeBaseFiles({ ...promptValues });

if (selected === 'lib') {
  console.log('Selected Values for Library:', promptValues);
  await generateLibFiles({ ...promptValues });
}
