import express, { Application, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { setupSwagger } from './swagger';

const app: Application = express();

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Dynamic Route Loader =====
const routesPath = path.join(__dirname, 'routes');

const loadRoutes = (directory: string) => {
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach((file) => {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        loadRoutes(fullPath);
      } else if (file.endsWith('.routes.ts')) {
        try {
          const { path: routePath, router } = require(fullPath);
          if (routePath && router) {
            app.use(routePath, router);
            console.log(`Loaded route: ${routePath} from ${file}`);
          }
        } catch (error) {
          console.error(`Failed to load route ${file}:`, error);
        }
      }
    });
  }
};

loadRoutes(routesPath);

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

// ===== Swagger =====
setupSwagger(app);

// ===== Root Endpoint =====
app.get('/', (_req: Request, res: Response) => {
  res.send('API is running 🚀');
});

// ===== Global Error Handler =====
app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
  }
);

export default app;
