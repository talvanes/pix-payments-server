import { Migrator } from '@root/db/migrator'
import { mockClient, mockPool } from '../setup'

describe('Migrator', () => {
    let migrator

    beforeEach(() => {
        migrator = new Migrator(mockPool)
    })

    test('initializes migration table', async () => {
        await migrator.initialize()
        expect(mockClient.query).toHaveBeenCalledWith(
            expect.stringContaining(
                'CREATE TABLE IF NOT EXISTS schema_migrations'
            )
        )
    })

    test('gets executed migrations', async () => {
        mockClient.query.mockResolvedValueOnce({
            rows: [{ id: '001' }, { id: '002' }],
        })
        const migrations = await migrator.getExecutedMigrations()
        expect(migrations).toEqual(['001', '002'])
    })

    test('runs pending migrations', async () => {
        mockClient.query
            .mockResolvedValueOnce({ rows: [] }) // no executed migrations
            .mockResolvedValueOnce({ rows: [] }) // BEGIN
            .mockResolvedValueOnce({ rows: [] }) // first migration
            .mockResolvedValueOnce({ rows: [] }) // COMMIT

        await migrator.runMigrations()
        expect(mockClient.query).toHaveBeenCalledWith('BEGIN')
        expect(mockClient.query).toHaveBeenCalledWith('COMMIT')
    })

    test('rollbacks last migration', async () => {
        mockClient.query.mockResolvedValueOnce({ rows: [{ id: '001' }] })

        await migrator.rollback()
        expect(mockClient.query).toHaveBeenCalledWith('BEGIN')
        expect(mockClient.query).toHaveBeenCalledWith('COMMIT')
    })
})
