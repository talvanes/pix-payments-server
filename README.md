# PIX Payments Server

PIX payment system with user authentication and real-time dashboard monitoring. The server part.

## Overview

This is the server-side component of the PIX Payments system, providing a robust backend for managing PIX transactions with user authentication and real-time monitoring capabilities. Built with Node.js and PostgreSQL, it offers a reliable and scalable solution for PIX payment processing.

## Project Structure

```
├── db/                    # Database-related files
│   ├── migrations/        # Database migration files
├── src/                   # Source code
│   ├── env.js             # Environment configuration
│   ├── server.js          # Main application entry point
│   └── http/              # HTTP-related modules
│       ├── plugins/       # Server plugins
│       └── routes/        # API routes
├── tests/                 # Test files
│   └── setup.js           # Test setup and configuration
├── docker-compose.yml     # Docker services configuration
├── .env.example           # Environment variables template
├── eslint.config.mjs      # ESLint configuration
├── .prettierrc            # Prettier configuration
├── babel.config.js        # Babel configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm
- Docker and Docker Compose (for containerized deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/talvanes/pix-payments-server.git
   cd pix-payments-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment example file and configure your environment variables:
   ```bash
   cp .env-example .env
   ```

### Development

To start the development server with hot reload:
```bash
npm run dev
```

### Docker Deployment

The application is containerized using Docker and includes:
- PostgreSQL database server
- DBGate database management interface
- Node.js application server

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

2. The services will be available at:
   - Database GUI (DBGate): http://localhost:3000
   - PostgreSQL: localhost:5432
   - Node.js server
     Available under the command `npm run dev`: http://localhost:3100

### Database Configuration

PostgreSQL database settings:
- Database Name: pix_payments
- Username: pix_user
- Password: pix_password
- Host: localhost (or 'pgsql' within Docker network)
- Port: 5432

To connect using DBGate:
1. Access DBGate at http://localhost:3000
2. Create a new PostgreSQL connection
3. Use the credentials above
4. For host, use 'pgsql' if connecting through DBGate container

### Database Migrations

The project uses Knex.js for database migrations. The following migrations are available:

- `20250805180541_create_users_table.js` - Creates the users table
- `20250805180730_create_pix_charges_table.js` - Creates the PIX charges table
- `20250805180813_create_pix_charges_indexes.js` - Creates indexes for PIX charges

To set up the database:

1. Ensure your database connection is configured in `knexfile.js`
2. Run migrations:
   ```bash
   npm run migrate
   ```

If you need to roll back migrations:
```bash
npm run migrate:rollback
```

To create a new migration:
```bash
npm run migrate:make migration_name
```

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build the project using Babel
- `npm start` - Build and start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

#### Database Migration Scripts

- `npm run migrate` - Run all pending database migrations
- `npm run migrate:rollback` - Rollback the last batch of migrations
- `npm run migrate:make <name>` - Create a new migration file
- `npm run migrate:status` - Show the status of all migrations

### Docker Commands

- `docker-compose up` - Start all services
- `docker-compose up -d` - Start all services in detached mode
- `docker-compose down` - Stop all services
- `docker-compose down -v` - Stop all services and remove volumes
- `docker-compose logs` - View service logs
- `docker-compose ps` - List running services

## Network Configuration

The application uses a dedicated Docker network 'pix-payments-network' for secure communication between services. All services are isolated within this network, with only necessary ports exposed to the host system.

## Persistence

PostgreSQL data is persisted using Docker volumes:
- `postgres_data`: Stores the PostgreSQL database files
- `dbgate_data`: Stores DBGate configurations and settings

## License

This project is licensed under the WTFPL (What The F*ck You Want To) Public License - see the [LICENSE](LICENSE) file for details.
