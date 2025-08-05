import { expect, jest } from '@jest/globals'
import { mockClient, mockPool } from '../setup'

jest.mock('pg', () => ({
    Pool: jest.fn(() => mockPool),
}))

jest.mock('inquirer', () => ({
    prompt: jest.fn(),
}))

describe('Migration CLI', () => {
    let originalArgv

    beforeEach(() => {
        originalArgv = process.argv
        jest.resetModules()
    })

    afterEach(() => {
        process.argv = originalArgv
    })

    test('up command runs migrations', async () => {
        process.argv = ['node', 'migrate-cli.js', 'up']
        mockClient.query.mockResolvedValueOnce({ rows: [] })

        const cli = await import('@root/db/migrate-cli')
        expect(mockClient.query).toHaveBeenCalled()
        expect(cli.migrator.runMigrations).toHaveBeenCalled()
    })

    test('down command with confirmation rolls back', async () => {
        process.argv = ['node', 'migrate-cli.js', 'down']
        const inquirer = require('inquirer')
        inquirer.prompt.mockResolvedValueOnce({ confirmed: true })

        mockClient.query.mockResolvedValueOnce({ rows: [{ id: '001' }] })

        const cli = await import('@root/db/migrate-cli')
        expect(mockClient.query).toHaveBeenCalled()
        expect(cli.migrator.rollback).toHaveBeenCalled()
    })

    test('status command shows migrations', async () => {
        process.argv = ['node', 'migrate-cli.js', 'status']
        mockClient.query.mockResolvedValueOnce({ rows: [{ id: '001' }] })

        const cli = await import('@root/db/migrate-cli')
        expect(mockClient.query).toHaveBeenCalled()
        expect(cli.migrator.getExecutedMigrations).toHaveBeenCalled()
    })
})
