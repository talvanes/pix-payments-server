import { beforeAll, describe, expect, it } from '@jest/globals'
import authenticateJWTRequest from '../../src/http/hooks/authenticate-jwt-request.js'
import { buildServer } from '../../src/server.js'

describe('Authenticate Plugin', () => {
    let server

    beforeAll(async () => {
        server = await buildServer()
    })

    it('should reject requests without token', async () => {
        server.register(authenticateJWTRequest)
        await server.ready()

        const response = await server.inject({
            method: 'GET',
            url: '/auth/verify',
        })

        expect(response.statusCode).toBe(401)
    })

    it('should accept valid JWT token in Authorization header', async () => {
        server.register(authenticateJWTRequest)
        await server.ready()

        // TODO Create factory function for user authentication
        const userId = '00000000-0000-0000-0000-000000000000'

        const token = server.jwt.sign({ userId })

        const response = await server.inject({
            method: 'GET',
            url: '/auth/verify',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        expect(response.statusCode).toBe(200)
    })

    it('should accept valid JWT token in cookie', async () => {
        server.register(authenticateJWTRequest)
        await server.ready()

        // TODO Create factory function for user authentication
        const userId = '00000000-0000-0000-0000-000000000000'

        const token = server.jwt.sign({ userId })

        const response = await server.inject({
            method: 'GET',
            url: '/auth/verify',
            cookies: {
                auth_token: token,
            },
        })

        expect(response.statusCode).toBe(200)
    })
})
