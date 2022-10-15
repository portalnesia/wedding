#!/usr/bin/env node

import chalk from 'chalk'
import {Command} from 'commander'
import path from "path"
import prompts from 'prompts'
import checkForUpdate from 'update-check'
import packageJson from '../package.json'
import { createApp } from './create-app'
import { validateNpmName } from './helpers/validate-pkg'

let projectPath: string = ''
let projectTemplate: string = ""

interface InterfaceCLI extends Command {
  template?: string
}

const program: InterfaceCLI = new Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
  .action((name) => {
    projectPath = name
  })
  .option(
    '-t, --template [name]',
    `
  An example to bootstrap the app with. You can use an template directory name
  from the portalnesia wedding repo.
`
  )
  .parse(process.argv)

async function run(): Promise<void> {
    if (typeof projectPath === 'string') {
        projectPath = projectPath.trim()
    }
    if(typeof program.template === 'string') {
        projectTemplate = program.template.trim();
    }

    if (!projectPath) {
        const res = await prompts({
            type: 'text',
            name: 'path',
            message: 'What is your project named?',
            initial: 'my-wedding-app',
            validate: (name) => {
                const validation = validateNpmName(path.basename(path.resolve(name)))
                if (validation.valid) {
                    return true
                }
                return 'Invalid project name: ' + validation.problems![0]
            },
        })
    
        if (typeof res.path === 'string') {
            projectPath = res.path.trim()
        }
    }

    if (!projectPath) {
        console.log(
          '\nPlease specify the project directory:\n' +
            `  ${chalk.cyan(program.name())} ${chalk.green(
              '<project-directory>'
            )}\n` +
            'For example:\n' +
            `  ${chalk.cyan(program.name())} ${chalk.green('my-wedding-app')}\n\n` +
            `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
        )
        process.exit(1)
    }

    if(!projectTemplate) {
        const res = await prompts({
            type: 'text',
            name: 'path',
            message: 'What is template you use in wedding website?',
            initial: 'template-1',
            validate: (name) => {
                const template = ['template-1']
                if(!template.includes(name)) {
                    return 'Invalid template name'
                }
                return true;
            },
        })
        if (typeof res.path === 'string') {
            projectTemplate = res.path.trim()
        }
    }

    if(!projectTemplate) {
        console.log(
            '\nPlease specify the project template:\n' +
              `  ${chalk.cyan(program.name())} ${chalk.green(
                '<project-directory> -t <project-template>'
              )}\n` +
              'For example:\n' +
              `  ${chalk.cyan(program.name())} ${chalk.green('my-wedding-app')} -t template-1\n\n` +
              `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
          )
        process.exit(1)
    }

    const resolvedProjectPath = path.resolve(projectPath)
    const projectName = path.basename(resolvedProjectPath)

    const { valid, problems } = validateNpmName(projectName)
  if (!valid) {
    console.error(
      `Could not create a project called ${chalk.red(
          `"${projectName}"`
      )} because of npm naming restrictions:`
    )

    problems!.forEach((p) => console.error(`    ${chalk.red.bold('*')} ${p}`))
    process.exit(1)
  }

  await createApp({
    appPath: resolvedProjectPath,
    template:projectTemplate
  })
}

const update = checkForUpdate(packageJson).catch(() => null)

async function notifyUpdate(): Promise<void> {
    try {
      const res = await update
      if (res?.latest) {
        const updateMessage = 'npm i -g create-portalnesia-wedding-app'
  
        console.log(
          chalk.yellow.bold('A new version of `create-portalnesia-wedding-app` is available!') +
            '\n' +
            'You can update by running: ' +
            chalk.cyan(updateMessage) +
            '\n'
        )
      }
      process.exit()
    } catch {
      // ignore error
    }
}

run()
  .then(notifyUpdate)
  .catch(async (reason) => {
    console.log()
    console.log('Aborting installation.')
    if (reason.command) {
      console.log(`  ${chalk.cyan(reason.command)} has failed.`)
    } else {
      console.log(
        chalk.red('Unexpected error. Please report it as a bug:') + '\n',
        reason
      )
    }
    console.log()

    await notifyUpdate()

    process.exit(1)
})