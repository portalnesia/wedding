import chalk from 'chalk'
import cpy from 'cpy'
import fs from 'fs'
import os from 'os'
import retry from 'async-retry'
import path from 'path'
import { isFolderEmpty } from './helpers/is-folder-empty'
import { isWriteable } from './helpers/is-writable'
import { makeDir } from './helpers/make-dir'
import {
    downloadAndExtractTemplate,
    existsInRepo,
  } from './helpers/templates'
import { install } from './helpers/install'

export class DownloadError extends Error {}

export async function createApp({
    appPath,
    template
}: {
    appPath: string
    template: string
}) {
    const found = await existsInRepo(template)

    if (!found) {
        console.error(
            `Could not locate an example named ${chalk.red(
            `"${template}"`
            )}. It could be due to the following:\n`,
            `1. Your spelling of example ${chalk.red(
            `"${template}"`
            )} might be incorrect.\n`,
            `2. You might not be connected to the internet or you are behind a proxy.`
        )
        process.exit(1)
    }

    const root = path.resolve(appPath)

    if (!(await isWriteable(path.dirname(root)))) {
        console.error(
          'The application path is not writable, please check folder permissions and try again.'
        )
        console.error(
          'It is likely you do not have write permissions for this folder.'
        )
        process.exit(1)
    }
    
    const appName = path.basename(root)

    await makeDir(root)
    if (!isFolderEmpty(root, appName)) {
        process.exit(1)
    }

    const originalDirectory = process.cwd()

    console.log(`Creating a new Wedding websites in ${chalk.green(root)}.`)
    console.log()

    process.chdir(root)

    const packageJsonPath = path.join(root, 'package.json')
    let hasPackageJson = false

    try {
        console.log(
            `Downloading files for template ${chalk.cyan(
            template
            )}. This might take a moment.`
        )
        console.log()

        await retry(() => downloadAndExtractTemplate(root, template), {
        retries: 3,
        })
    } catch(reason) {
        function isErrorLike(err: unknown): err is { message: string } {
            return (
            typeof err === 'object' &&
            err !== null &&
            typeof (err as { message?: unknown }).message === 'string'
            )
        }
        throw new DownloadError(
            isErrorLike(reason) ? reason.message : reason + ''
        )
    }

    hasPackageJson = fs.existsSync(packageJsonPath)
    if (hasPackageJson) {
        const packageJsonStr = (await fs.promises.readFile(packageJsonPath)).toString();
        const packageJson = JSON.parse(packageJsonStr);

        packageJson.name = appName
        packageJson.version = "1.0.0"
        packageJson.private = true;

        await fs.promises.writeFile(packageJsonPath,JSON.stringify(packageJson,null,2) + os.EOL)

        console.log('Installing packages. This might take a couple of minutes.')
        console.log()

        await install(root)
        console.log()
    }

    let cdpath: string
    if (path.join(originalDirectory, appName) === appPath) {
        cdpath = appName
    } else {
        cdpath = appPath
    }

    console.log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`)

    if (hasPackageJson) {
        console.log('Inside that directory, you can run several commands:')
        console.log()
        console.log(chalk.cyan(`  npm run dev`))
        console.log('    Starts the development server.')
        console.log()
        console.log(chalk.cyan(`  npm run build`))
        console.log('    Builds the app for production.')
        console.log()
        console.log(chalk.cyan(`  npm start`))
        console.log('    Runs the built app in production mode.')
        console.log()
        console.log('We suggest that you begin by typing:')
        console.log()
        console.log(chalk.cyan('  cd'), cdpath)
        console.log(
          `  ${chalk.cyan(`npm run dev`)}`
        )
    }
    console.log()
}