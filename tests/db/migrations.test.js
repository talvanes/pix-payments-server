import { migrations } from '@root/db/migrations'
import { mockClient } from '../setup'

describe('Migrations', () => {
    test('migrations are properly structured', () => {
        migrations.forEach((migration) => {
            expect(migration).toHaveProperty('id')
            expect(migration).toHaveProperty('up')
            expect(migration).toHaveProperty('down')
            expect(migration).toHaveProperty('description')
            expect(typeof migration.up).toBe('function')
            expect(typeof migration.down).toBe('function')
        })
    })

    test('migrations are ordered correctly', () => {
        const ids = migrations.map((m) => m.id)
        expect(ids).toEqual([...ids].sort())
    })

    test('each migration can execute up and down', async () => {
        for (const migration of migrations) {
            await migration.up(mockClient)
            expect(mockClient.query).toHaveBeenCalled()

            mockClient.query.mockClear()

            await migration.down(mockClient)
            expect(mockClient.query).toHaveBeenCalled()

            mockClient.query.mockClear()
        }
    })
})
