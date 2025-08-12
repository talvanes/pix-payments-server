import { env } from '@/env.js'
import corePlugins from '@/http/plugins/core.plugin.js'
import routes from '@/http/routes'
import fastify from 'fastify'

// Function to start the server
async function startServer() {
    const server = await buildServer()
    const port = env['PORT']

    try {
        await server.listen({ port })
        console.log(`PIX Payment Server is running on http://localhost:${port}`)
    } catch (error) {
        console.error('Error starting server:', error)
        process.exit(1)
    }
}

// Function to build the server
async function buildServer() {
    // Create a Fastify server instance
    const server = fastify({
        logger: {
            transport: {
                target: 'pino-pretty',
                options: {
                    translateTime: 'HH:MM:ss Z',
                    ignore: 'pid,hostname',
                },
            },
        },
    })

    // Loading core server plugins
    corePlugins.forEach((options, serverPlugin) => {
        server.register(serverPlugin, options)
    })

    // Health check route
    server.get('/', () => 'ok')

    // Loading application routes
    routes.forEach((options, routeGroup) => {
        server.register(routeGroup, options)
    })

    return server
}

// Start the application server
startServer()

export { buildServer }
