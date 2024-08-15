import fs from 'fs/promises'
import chalk from 'chalk'
const log = console.log

export const writeFile = async (path: string, data: string) => {
  await fs
    .writeFile(path, data)
    .then(() => {
      log(chalk.green(`${path} created`))
    })
    .catch((err) => {
      log(chalk.red(err))
      process.exit(1)
    })
}
