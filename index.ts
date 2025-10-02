import express from 'express';
import helmet from 'helmet';
import type { Application, Request, Response } from 'express';
import buildRoutes from '@/routes/index.js';

const app: Application = express();

app.use(helmet());

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
