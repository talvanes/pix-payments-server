import { beforeEach, jest } from '@jest/globals'

// Mock pg module
export const mockClient = {
    query: jest.fn(),
    release: jest.fn(),
}

export const mockPool = {
    connect: jest.fn().mockResolvedValue(mockClient),
    end: jest.fn().mockResolvedValue(),
}

// Mock console methods
export const mockConsole = {
    log: jest.fn(),
    error: jest.fn(),
}

// Reset mocks before each test
beforeEach(() => {
    jest.clearAllMocks()
    mockClient.query.mockClear()
    mockClient.release.mockClear()
    mockPool.connect.mockClear()
    mockPool.end.mockClear()
    mockConsole.log.mockClear()
    mockConsole.error.mockClear()
})
