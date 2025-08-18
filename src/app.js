import { env } from './env.js'
import { buildServer } from './server.js'

const server = await buildServer()
const port = env['PORT']

try {
    await server.listen({ port })
    console.log(`PIX Payment Server is running on http://localhost:${port}`)
} catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
}
