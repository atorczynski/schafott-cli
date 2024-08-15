#!/usr/bin/env node

import { input, select, Separator } from '@inquirer/prompts'
import pkg from './scaffolds/npm-library/package.scaffold.json'
import fs from 'fs'
import chalk from 'chalk'

const selected = await select({
  message: 'Package Type',
  choices: [
    { name: 'JS-Library', value: 'lib' },
    new Separator(),
    { name: 'cancel', value: 'cancel' },
  ],
})

const currentPathContent = await fs.readdirSync('.')
console.log(currentPathContent)
if (currentPathContent.length > 0) {
  chalk.red('Current directory is not empty')
  const projectName = await input({
    message: 'Project Name',
  })
  if (!projectName) {
    console.log('Project Name is required')
    process.exit(1)
  }
  fs.mkdirSync(projectName)
}

if (selected === 'cancel') {
  process.exit(0)
}
if (selected === 'lib') {
  console.log('JS-Library selected')
}

if (selected === 'lib') {
  const pkgName = await input({
    message: 'Package Name',
  })

  if (!pkgName) {
    console.log('Package Name is required')
    process.exit(1)
  }
  if (pkgName.includes(' ')) {
    console.log('Package Name should not contain spaces')
    process.exit(1)
  }
  pkg.name = pkgName
  const packageJson = JSON.stringify(pkg, null, 2)
  fs.writeFileSync('package.json', packageJson)
  console.log('package.json created')
  if (fs.existsSync('src')) {
    const srcExists = await select({
      message: 'src directory already exists, overwrite?',
      choices: [
        { name: 'Yes', value: 'yes' },
        { name: 'No', value: 'no' },
      ],
    })
    if (srcExists === 'no') {
      chalk.red('src directory already exists')
      process.exit(0)
    }
  }
  fs.mkdirSync('src')
  console.log('src directory created')
  fs.writeFileSync('src/index.js', '')
  console.log('src/index.js created')
}
