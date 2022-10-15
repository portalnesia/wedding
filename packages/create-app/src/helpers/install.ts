import chalk from 'chalk'
import spawn from 'cross-spawn'

export function install(
    root: string,
) {
    const npmFlags: string[] = []

    return new Promise<void>((resolve, reject) => {
        const command = "npm"
        const args: string[] = ["install"]
        args.push(...npmFlags)

        const child = spawn(command, args, {
            stdio: 'inherit',
            env: {
              ...process.env,
              ADBLOCK: '1',
              // we set NODE_ENV to development as pnpm skips dev
              // dependencies when production
              NODE_ENV: 'development',
              DISABLE_OPENCOLLECTIVE: '1',
            },
        })

        child.on('close', (code) => {
            if (code !== 0) {
              reject({ command: `${command} ${args.join(' ')}` })
              return
            }
            resolve()
        })
    })
}