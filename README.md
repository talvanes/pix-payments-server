# PIX Payments Server

PIX payment system with user authentication and real-time dashboard monitoring. The server part.

## Overview

This is the server-side component of the PIX Payments system, providing a robust backend for managing PIX transactions with user authentication and real-time monitoring capabilities.

## Project Structure

```
src/
  ├── env.js         # Environment configuration
  ├── server.js      # Main application entry point
  └── http/          # HTTP-related modules (routes, plugins)
      ├── plugins/   # Server plugins
      └── routes/    # API routes
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm

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

### Production

To build and start the production server:
```bash
npm start
```

### Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build the project using Babel
- `npm start` - Build and start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues

## License

This project is licensed under the WTFPL (What The F*ck You Want To) Public License - see the [LICENSE](LICENSE) file for details.
