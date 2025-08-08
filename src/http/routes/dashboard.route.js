// dashboard.route.js

import DashboardController from '@/http/controllers/DashboardController.js'
import authenticatePlugin from '@/http/plugins/authenticate.plugin.js'
import {
    chargesByStatusQueryingSchema,
    completeDashboardDataQueryingSchema,
    dashboardStatisticsQueryingSchema,
    recentChargeQueryingSchema,
} from '../schemas/dashboard.schema'

/**
 * Dashboard routes
 * @param {import("fastify/types/instance").FastifyInstance} server  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function dashboardRoutes(server, options) {
    const dashboardController = new DashboardController()
    const authenticate = await authenticatePlugin(server)

    //  Dashboard statistics endpoint (protected)
    server.get(
        '/stats',
        {
            preHandler: [authenticate],
            schema: dashboardStatisticsQueryingSchema,
        },
        dashboardController.getDashboardStats
    )

    // Recent charge querying endpoint (protected)
    server.get(
        '/recent',
        {
            preHandler: [authenticate],
            schema: recentChargeQueryingSchema,
        },
        dashboardController.getRecentPixCharges
    )

    // Complete dashboard data querying endpoint (protected)
    server.get(
        '/',
        {
            preHandler: [authenticate],
            schema: completeDashboardDataQueryingSchema,
        },
        dashboardController.getDashboardData
    )

    // Charges by status querying endpoint (protected)
    server.get(
        '/charges/:status',
        {
            preHandler: [authenticate],
            schema: chargesByStatusQueryingSchema,
        },
        dashboardController.getChargesByStatus
    )
}

export default dashboardRoutes
