// http/plugins/core.plugin.js

import { env } from '@/env'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'

/**
 * @type {Map<import('fastify').FastifyPluginCallback, import('fastify').FastifyPluginOptions>}
 */
const corePlugins = new Map([
    // CORS settings
    [
        fastifyCookie,
        {
            origin: 'http://127.0.0.1:5173',
            credentials: true,
        },
    ],

    // Cookie parser
    [fastifyCors, {}],

    // JWT authentication
    [
        fastifyJwt,
        {
            secret: env['JWT_SECRET'],
        },
    ],
])

export default corePlugins
