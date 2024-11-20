# Node.js Boilerplate Project

This is a Node.js boilerplate project designed to kickstart development with a structured and scalable architecture. It
includes ready-to-use configurations, routes, models, and services to streamline development.

## Features
- **User Authentication**: JWT-based authentication with access and refresh tokens.
- **User CRUD**: Basic user management with CRUD operations.
- **Modular Architecture**: Organized by features and responsibilities.
- **Database Support**: Built with Sequelize for database modeling, migrations, and seeding.
- **Validation**: Centralized input validation with reusable rules.
- **Middleware**: Support for custom middleware.
- **Static Files**: Public directory for serving static assets.
- **Scalability**: Easily extendable structure for growing applications.
- **Error Handling**: Centralized error handling middleware.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm
- Database (e.g., PostgreSQL)

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:SirojbekMaqsudov/node-boilerplate.git
   cd node-boilerplate
    ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

   ```bash
    DB_NAME=DB_NAME
    DB_USER=DB_USER
    DB_HOST=DB_HOST
    DB_PASSWORD=DB_PASSWORD
    DB_PORT=DB_PORT
    JWT_ACCESS_SECRET=JWT_ACCESS_SECRET
    JWT_REFRESH_SECRET=JWT_REFRESH_SECRET
    JWT_ACCESS_EXPIRATION=JWT_ACCESS_EXPIRATION
    JWT_REFRESH_EXPIRATION=JWT_REFRESH_EXPIRATION
    BCRYPT_SALT_ROUNDS=BCRYPT_SALT_ROUNDS
    SECRET_KEY=SECRET_KEY
    PORT=PORT
    ```

4. Run the migrations:

   ```bash
   npm run migrate
   ```

5. Run the seeders if you want admin user:

   ```bash
   npm run seeder
   ```

6. Start the server:

   ```bash
    npm run dev
    ```

## Don't forget to ⭐ this repository if you find it useful!