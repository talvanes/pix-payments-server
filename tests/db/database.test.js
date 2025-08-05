import { jest } from '@jest/globals'
import Database from '@root/db/database'
import { mockClient, mockPool } from '../setup'

jest.mock('pg', () => ({
    Pool: jest.fn(() => mockPool),
}))

describe('Database', () => {
    let db

    beforeEach(() => {
        db = new Database('localhost', 'testdb', 'user', 'pass')
    })

    test('initializes successfully', async () => {
        await db.initialize()
        expect(mockPool.connect).toHaveBeenCalled()
        expect(mockClient.release).toHaveBeenCalled()
    })

    test('runs query with parameters', async () => {
        mockClient.query.mockResolvedValueOnce({
            rows: [{ id: 1 }],
            rowCount: 1,
        })
        const result = await db.run('INSERT INTO test VALUES ($1)', ['value'])
        expect(result).toEqual({ id: 1, changes: 1 })
    })

    test('gets single row', async () => {
        const mockRow = { id: 1, name: 'test' }
        mockClient.query.mockResolvedValueOnce({ rows: [mockRow] })
        const result = await db.get('SELECT * FROM test WHERE id = $1', [1])
        expect(result).toEqual(mockRow)
    })

    test('gets all rows', async () => {
        const mockRows = [{ id: 1 }, { id: 2 }]
        mockClient.query.mockResolvedValueOnce({ rows: mockRows })
        const result = await db.all('SELECT * FROM test')
        expect(result).toEqual(mockRows)
    })

    test('closes connection', async () => {
        await db.close()
        expect(mockPool.end).toHaveBeenCalled()
    })
})
