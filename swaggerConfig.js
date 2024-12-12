import { __dirname } from './utils.js';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mocks API',
            version: '1.0.0',
            description: 'API para la generación y gestión de datos ficticios (usuarios y mascotas)'
        },
        servers: [
            {
                url: 'http://localhost:8080', // URL base del servidor
                description: 'Servidor local de desarrollo'
            }
        ]
    },
    apis: [`${__dirname}/src/routes/*.js`] // Ruta a los archivos de rutas documentados con JSDoc
};

export default swaggerOptions;