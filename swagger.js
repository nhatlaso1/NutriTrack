const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nutri_Track REST API',
      version: '1.0.0',
      description: 'This is a swagger API',
    },
    servers: [{ url: 'http://localhost:3500', description: 'This is the local development environment' }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
  },
  apis: ['./allRouter.js'],
  security: [
    {
      BearerAuth: [], 
    },
  ]
};
export default options;
