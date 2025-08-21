import { beforeAll, describe, expect, it } from '@jest/globals'
import { buildServer } from '../../src/server.js'

describe('Auth Routes', () => {
    let server

    beforeAll(async () => {
        server = await buildServer()
    })

    describe('POST /auth/login', () => {
        it('should authenticate valid credentials', async () => {
            const response = await server.inject({
                method: 'POST',
                url: '/auth/login',
                payload: {
                    username: 'testuser',
                    password: 'testpass',
                },
            })

            expect(response.statusCode).toBe(200)
            expect(JSON.parse(response.payload)).toHaveProperty('token')
        })

        it('should reject invalid credentials', async () => {
            const response = await server.inject({
                method: 'POST',
                url: '/auth/login',
                payload: {
                    username: 'wronguser',
                    password: 'wrongpass',
                },
            })

            expect(response.statusCode).toBe(401)
        })
    })
})
