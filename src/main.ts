#!/usr/bin/env node

import { select, Separator } from '@inquirer/prompts'
import { create } from 'domain'
import fs from 'fs'
import { changeName, createPkg } from './scaffolds/npm-library/npm-package.js'

const selected = await select({
  message: 'Select a package manager',
  choices: [
    {
      name: 'npm',
      value: 'npm',
      description: 'npm is the most popular package manager',
    },
    {
      name: 'yarn',
      value: 'yarn',
      description: 'yarn is an awesome package manager',
    },
    new Separator(),
    {
      name: 'jspm',
      value: 'jspm',
      disabled: true,
    },
    {
      name: 'pnpm',
      value: 'pnpm',
      disabled: '(pnpm is not available)',
    },
  ],
})

if (selected === 'npm') {
  await createPkg('npm-library')
  await changeName('npm-library')
}
