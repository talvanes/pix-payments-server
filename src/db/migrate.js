#!/usr/bin/env node

import { env } from '@/env.js'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { Pool } from 'pg'
import { Migrator } from './migrator.js'

const pool = new Pool({
    host: env['DB_HOST'],
    port: env['DB_PORT'],
    database: env['DB_NAME'],
    user: env['DB_USER'],
    password: env['DB_PASSWORD'],
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

const migrator = new Migrator(pool)

async function confirmPrompt(message) {
    const { confirmed } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmed',
            message,
            default: false,
        },
    ])
    return confirmed
}

async function main() {
    const [, , command, arg] = process.argv

    try {
        if (command === 'up') {
            console.log(chalk.blue('Running all pending migrations...'))
            await migrator.runMigrations()
            console.log(chalk.green('Migrations complete!'))
        } else if (command === 'down') {
            const msg = arg
                ? `Are you sure you want to rollback all migrations after ${chalk.yellow(arg)}?`
                : 'Are you sure you want to rollback the last migration?'
            if (await confirmPrompt(msg)) {
                await migrator.rollback(arg)
                console.log(chalk.green('Rollback complete!'))
            } else {
                console.log(chalk.gray('Rollback canceled.'))
            }
        } else if (command === 'status') {
            const executed = await migrator.getExecutedMigrations()
            if (executed.length === 0) {
                console.log(chalk.yellow('No migrations have been run yet.'))
            } else {
                console.log(chalk.cyan('Executed migrations:'))
                executed.forEach((id) => console.log(chalk.green(`  - ${id}`)))
            }
        } else if (command === 'init') {
            console.log(chalk.blue('Initializing the migration schema...'))
            await migrator.initialize()
            console.log(
                chalk.green('Initialized migration schema successfully!')
            )
        } else {
            console.log(chalk.bold('Migration CLI'))
            console.log(
                'Usage: node db/migrate.js <up|down|status|init> [target_migration_id]'
            )
            console.log('  up      - Run all pending migrations')
            console.log(
                '  down    - Rollback last migration or to a specific migration'
            )
            console.log('  status  - Show executed migrations')
        }
    } catch (err) {
        console.error(chalk.red('Migration error:'), err)
        process.exit(1)
    } finally {
        await pool.end()
    }
}

main()
