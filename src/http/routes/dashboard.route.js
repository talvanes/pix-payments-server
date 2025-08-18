// dashboard.route.js

import DashboardController from '../controllers/DashboardController.js'
import checkRequestJWT from '../hooks/check-jwt-request.js'
import {
    chargesByStatusQueryingSchema,
    completeDashboardDataQueryingSchema,
    dashboardStatisticsQueryingSchema,
    recentChargeQueryingSchema,
} from '../schemas/dashboard.schema.js'

/**
 * Dashboard routes
 * @param {import("fastify/types/instance").FastifyInstance} server  Encapsulated Fastify Instance
 */
async function dashboardRoutes(server) {
    const dashboardController = new DashboardController()

    //  Dashboard statistics endpoint (protected)
    server.get(
        '/stats',
        {
            preHandler: [checkRequestJWT],
            schema: dashboardStatisticsQueryingSchema,
        },
        dashboardController.getDashboardStats
    )

    // Recent charge querying endpoint (protected)
    server.get(
        '/recent',
        {
            preHandler: [checkRequestJWT],
            schema: recentChargeQueryingSchema,
        },
        dashboardController.getRecentPixCharges
    )

    // Complete dashboard data querying endpoint (protected)
    server.get(
        '/',
        {
            preHandler: [checkRequestJWT],
            schema: completeDashboardDataQueryingSchema,
        },
        dashboardController.getDashboardData
    )

    // Charges by status querying endpoint (protected)
    server.get(
        '/charges/:status',
        {
            preHandler: [checkRequestJWT],
            schema: chargesByStatusQueryingSchema,
        },
        dashboardController.getChargesByStatus
    )
}

export default dashboardRoutes
