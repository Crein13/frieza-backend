import express, { Application, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app: Application = express();

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Dynamic Route Loader =====
const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith('.routes.ts')) {
    const { path: routePath, router } = require(path.join(routesPath, file));
    app.use(routePath, router);
    console.log(`Loaded route: ${routePath}`);
  }
});

// ===== Data Loader Example =====
const dataPath = path.join(__dirname, 'data');
if (fs.existsSync(dataPath)) {
  fs.readdirSync(dataPath).forEach((file) => {
    if (file.endsWith('.json')) {
      const data = require(path.join(dataPath, file));
      console.log(`Loaded data file: ${file}`, data);
    }
  });
}

// ===== Swagger Setup =====
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My TypeScript Express API',
      version: '1.0.0',
      description: 'Auto-loaded routes with Swagger docs',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./routes/*.ts', './controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions as any);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log('Swagger docs available at /api-docs');

// ===== Root Endpoint =====
app.get('/', (_req: Request, res: Response) => {
  res.send('API is running 🚀');
});

// ===== Global Error Handler =====
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

export default app;
