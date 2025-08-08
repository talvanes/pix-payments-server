// dashboard.route.js

import DashboardController from '@/http/controllers/DashboardController.js'
import authenticatePlugin from '@/http/plugins/authenticate.plugin.js'

/**
 * Dashboard routes
 * @param {import("fastify/types/instance").FastifyInstance} server  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function dashboardRoutes(server, options) {
    const dashboardController = new DashboardController()
    const authenticate = await authenticatePlugin(server)
}

export default dashboardRoutes
