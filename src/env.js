import { config } from 'dotenv'
import { cleanEnv, port, str } from 'envalid'

// Load environment variables from .env file
config()

// Valdiate environment variables
export const env = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    PORT: port(),
    JWT_SECRET: str(),
    DB_HOST: str({ default: '127.0.0.1' }),
    DB_PORT: port({ default: 5432 }),
    DB_USER: str({ default: 'pix_user' }),
    DB_PASSWORD: str({ default: 'pix_password' }),
    DB_NAME: str({ default: 'pix_payments' }),
})
