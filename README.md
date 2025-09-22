# Frieza Backend

A robust backend service built with Node.js, Express, and TypeScript. It features JWT-based authentication, session management with Redis, an object-relational mapper with Prisma, and automated API documentation with Swagger.

## Features

- **TypeScript**: For type safety and improved developer experience.
- **Express Framework**: A minimal and flexible Node.js web application framework.
- **Prisma ORM**: Modern database toolkit for PostgreSQL, MySQL, SQL Server, and SQLite.
- **JWT Authentication**: Secure user authentication using JSON Web Tokens (`jsonwebtoken`).
- **Redis Session Management**: Caches refresh tokens for efficient and secure session handling.
- **Validation**: Request validation using `Joi`.
- **Password Hashing**: Securely hashes passwords using `bcrypt`.
- **Swagger API Documentation**: Automatically generated and interactive API documentation.
- **Linting & Formatting**: Code quality enforced with ESLint and Prettier.
- **Testing**: Unit and integration tests set up with Jest and Supertest.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma
- **In-memory Store**: Redis
- **Authentication**: JWT (jsonwebtoken)
- **API Documentation**: Swagger
- **Testing**: Jest & Supertest
- **Linting**: ESLint
- **Formatting**: Prettier

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [Yarn](https://yarnpkg.com/) or npm
- [PostgreSQL](https://www.postgresql.org/) (or another Prisma-supported database)
- [Redis](https://redis.io/)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Crein13/frieza-backend.git
cd frieza-backend
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project by copying the example file.

```bash
cp .env.example .env
```

Now, open the `.env` file and update the variables with your local configuration.

```ini
# ───── Application Config ─────
PORT=3000
NODE_ENV=development

# ───── Database (Prisma) ─────
# Update with your database connection string
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"

# ───── JWT Secrets ─────
# It's highly recommended to change these to long, random strings
ACCESS_SECRET="your_super_secret_access_token"
REFRESH_SECRET="your_super_secret_refresh_token"

# ───── Redis Config ─────
REDIS_URL="redis://localhost:6379"

# ───── Swagger Docs ─────
API_BASE_URL="http://localhost:3000"
```

### 4. Run Database Migrations

This command will apply the existing database schema to your database.

```bash
yarn prisma migrate dev
```

## Available Scripts

The `package.json` file includes several scripts to help with development:

- **Run in development mode (with hot-reloading):**
  ```bash
  yarn dev
  ```

- **Build the production version:**
  ```bash
  yarn build
  ```
  
- **Run the production version:**
  ```bash
  yarn start
  ```

- **Run tests:**
  ```bash
  yarn test
  ```

- **Run tests in watch mode:**
  ```bash
  yarn test:watch
  ```

- **Lint the codebase:**
  ```bash
  yarn lint
  ```

- **Fix linting errors automatically:**
  ```bash
  yarn lint:fix
  ```

- **Format the code with Prettier:**
  ```bash
  yarn format
  ```

## API Documentation

Once the server is running, you can access the interactive API documentation powered by Swagger.

Navigate to [http://localhost:3000/api-docs](http://localhost:3000/api-docs) in your browser.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
