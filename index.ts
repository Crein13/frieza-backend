import express from 'express';
import helmet from 'helmet';
import type { Application, Request, Response } from 'express';
import { __env } from '@/globals.js';
import buildRoutes from '@/routes/index.js';
const authConfig = await import(`./config/${__env}/auth.js`);

const app: Application = express();

app.use(helmet());

app.use(authConfig.default);

app.get('/test-endpoint', (_req: Request, res: Response) => {
  res.send('API is running 🚀');
});

const startServer = async () => {
  try {
    await buildRoutes(app);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

startServer();

export default app;
