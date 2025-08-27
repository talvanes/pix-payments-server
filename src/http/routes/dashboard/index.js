import getCompleteDashboardDataRoute from './get-complete-dashboard-data'
import getChargesByStatusRoute from './get-pix-transactions-by-status'
import getRecentChangesRoute from './get-recent-changes'
import getStatisticsRoute from './get-statistics'

/**
 * Dashboard routes for handling user dashboard operations
 * @param {import("fastify/types/instance").FastifyInstance} server Fastify instance
 */
export default async function dashboardRoutes(server) {
    server.register(getStatisticsRoute)
    server.register(getRecentChangesRoute)
    server.register(getCompleteDashboardDataRoute)
    server.register(getChargesByStatusRoute)
}
