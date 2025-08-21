export default {
    testEnvironment: 'node',
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    extensionsToTreatAsEsm: ['.js'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
        '@/(.*)': '<rootDir>/src/$1',
    },
    testMatch: ['**/*.test.js', '**/*.spec.js'],
    collectCoverageFrom: [
        'src/**/*.js',
        '!dist/**/*.js',
        '!database/migrations/**/*.js', // Exclude individual migration files from coverage
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
