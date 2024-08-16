import fs from 'fs'
import chalk from 'chalk'
import { select } from '@inquirer/prompts'
import pkg from '../../scaffolds/npm-library/package.scaffold.json'
import { createDefaultFiles } from '../write.js'

export const activatePathLib = async (pkgName: string) => {
  pkg.name = pkgName
  const packageJson = JSON.stringify(pkg, null, 2)
  fs.writeFileSync('package.json', packageJson)

  if (fs.existsSync('src')) {
    const srcExists = await select({
      message: 'src directory already exists, overwrite?',
      choices: [
        { name: 'Yes', value: 'yes' },
        { name: 'No', value: 'no' },
      ],
    })
    if (srcExists === 'no') {
      console.log(chalk.red('src directory already exists'))
      process.exit(0)
    }
  }

  try {
    await fs.mkdirSync('src')
    await createDefaultFiles()
  } catch (err) {
    console.log(chalk.red(err))
  }
}
