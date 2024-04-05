import swaggerJSDoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',
        info : {
            title: 'Node JS API Project for mongodb',
            version: '1.0.0',
            description: 'API documentation for managing books',
        },
        servers: [
            {
                url: 'http://localhost:3001/'
            }
        ],
         components: {
             schemas: {
                 User: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         email: {
                             type: 'string',
                             format: 'email',
                         },
                         createdAt: {
                             type: 'string',
                             format: 'date-time',
                         },
                     },
                 },
                 ProductCategory: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         name: {
                             type: 'string',
                         },
                         description: {
                             type: 'string',
                         },
                     },
                 },
                 Product: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         name: {
                             type: 'string',
                         },
                         description: {
                             type: 'string',
                         },
                         category: {
                             type: 'string',
                         },
                         articleNumber: {
                             type: 'integer',
                         },
                         barcode: {
                             type: 'integer',
                         },
                         selfWeight: {
                             type: 'integer',
                         },
                         maxNumberOfItems: {
                             type: 'integer',
                         },
                         currentNumberOfItems: {
                             type: 'integer',
                         },
                         status: {
                             type: 'string',
                         },
                     },
                 },
             },
        },
    },
    apis: ['./routes/*.js'],
}

export const swaggerSpec = swaggerJSDoc(options);