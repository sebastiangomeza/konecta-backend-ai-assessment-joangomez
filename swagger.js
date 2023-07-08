const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Opciones de configuración para Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Konecta',
      version: '1.0.0',
      description: 'API para realizar operaciones de autenticación y gestión de tareas',
    },
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        schemas: {
            User: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                  format: 'username',
                  description: 'username usuario',
                },
                password: {
                  type: 'string',
                  description: 'Contraseña del usuario',
                },
              },
            },
            LoginData: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                  format: 'username',
                  description: 'username usuario',
                },
                password: {
                  type: 'string',
                  description: 'Contraseña del usuario',
                },
              },
            },
            Task: {
              type: 'object',
              properties: {
                user_id: {
                  type: 'integer',
                  description: 'ID del usuario propietario de la tarea',
                },
                title: {
                  type: 'string',
                  description: 'Título de la tarea',
                },
                description: {
                  type: 'string',
                  description: 'Descripción de la tarea',
                },
                completed: {
                  type: 'boolean',
                  description: 'Indica si la tarea está completada',
                },
              },
            },
          },


      },
    servers: [
      {
        url: 'http://localhost:3000', // Reemplaza con la URL correcta de tu servidor
      },
    ],
  },
  apis: ['./app/routes/*.js'], // Ruta a los archivos de rutas de tu aplicación
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  // Ruta para servir la documentación de Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};


    
  