export default {
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testMatch: ['**/*.test.js', '**/*.spec.js'],
    collectCoverageFrom: [
        'db/**/*.js',
        '!db/migrations/**/*.js', // Exclude individual migration files from coverage
        '!**/node_modules/**',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
}
