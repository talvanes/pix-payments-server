import { config } from 'dotenv'
import { cleanEnv, port, str } from 'envalid'

// Load environment variables from .env file
config()

// Valdiate environment variables
export const env = cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    PORT: port(),
    JWT_SECRET: str(),
    SQLITE_DB_PATH: str({ default: './data/pix_payments.db' }),
    POSTGRES_HOST: str({ default: '127.0.0.1' }),
    POSTGRES_PORT: port({ default: 5432 }),
    POSTGRES_USER: str({ default: 'pix_user' }),
    POSTGRES_PASSWORD: str({ default: 'pix_password' }),
    POSTGRES_DB: str({ default: 'pix_payments' }),
})
