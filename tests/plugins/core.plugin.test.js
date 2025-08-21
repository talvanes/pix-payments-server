import { beforeAll, describe, expect, it } from '@jest/globals'
import { buildServer } from '../../src/server.js'

describe('Core Plugins', () => {
    let server

    beforeAll(async () => {
        server = await buildServer()
    })

    it('should have CORS enabled', async () => {
        const response = await server.inject({
            method: 'OPTIONS',
            url: '/',
            headers: {
                Origin: 'http://127.0.0.1:5173',
            },
        })

        expect(response.headers['access-control-allow-origin']).toBe(
            'http://127.0.0.1:5173'
        )
    })

    it('should have cookie plugin enabled', () => {
        expect(server.parseCookie).toBeDefined()
    })

    it('should have JWT plugin enabled', () => {
        expect(server.jwt).toBeDefined()
        expect(typeof server.jwt.sign).toBe('function')
        expect(typeof server.jwt.verify).toBe('function')
    })
})
