// http/routes/index.js

import authRoutes from '@/http/routes/auth.route.js'
import dashboardRoutes from '@/http/routes/dashboard.route.js'
import pixRoutes from '@/http/routes/pix.route.js'

/**
 * @type {Map<import('fastify').FastifyPluginCallback, import('fastify').FastifyRegisterOptions>}
 */
const routes = new Map([
    [authRoutes, { prefix: '/auth' }],
    [pixRoutes, { prefix: '/pix' }],
    [dashboardRoutes, { prefix: '/dashboard' }],
])

export default routes
