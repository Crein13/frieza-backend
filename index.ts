import express from 'express';
import type { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/test-endpoint', (_req: Request, res: Response) => {
  res.send('API is running 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

export default app;
