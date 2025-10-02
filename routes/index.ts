import fs from 'fs';
import type { Application } from 'express';
import path, { dirname } from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loadRoutes = async (app: Application, directory: string) => {
  if (!fs.existsSync(directory)) return;

  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await loadRoutes(app, fullPath);
    } else if (file.endsWith('.routes.ts') || file.endsWith('.routes.js')) {
      try {
        const module = await import(pathToFileURL(fullPath).href);
        const { path: routePath, router } = module;
        if (routePath && router) {
          app.use(routePath, router);
          console.log(`Loaded route: ${routePath} from ${file}`);
        } else {
          console.warn(`Skipped ${file} — missing "path" or "router" exports`);
        }
      } catch (error) {
        console.error(`Failed to load route ${file}:`, error);
      }
    }
  }
};


export default async function buildRoutes(app: Application) {
  const routesRoot = path.join(__dirname);
  await loadRoutes(app, routesRoot);
}