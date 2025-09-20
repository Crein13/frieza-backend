import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { Application } from 'express';

export const setupSwagger = (app: Application) => {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My TypeScript Express API',
        version: '1.0.0',
        description: 'Auto-loaded routes with Swagger docs',
      },
      servers: [{ url: process.env.API_BASE_URL }],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
    apis: ['./routes/*.ts', './controllers/*.ts'],
  };


  const swaggerSpec = swaggerJsdoc(swaggerOptions as any);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs available at /api-docs');
};
