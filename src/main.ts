#!/usr/bin/env node

import { generateLibFiles } from './utils/paths/js-lib/lib.path.js';
import path from 'path';
import { prompts } from './prompts.js';
import { writeBaseFiles } from './scaffolds/base/writeBaseFiles.js';
import { validatePath } from './utils/helpers.js';
import { generateReactFiles } from './utils/paths/react-lib/react-lib.path.js';

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
  await generateLibFiles({ ...promptValues });
}

if (selected === 'react-lib') {
  await generateReactFiles({ ...promptValues });
}
