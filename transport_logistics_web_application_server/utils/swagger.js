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
        tags: [
            {
                name: 'Authentication',
                description: 'Operations related to authentication'
            },
            {
                name: 'Users',
                description: 'Operations related to users'
            },
            {
                name: 'Cars',
                description: 'Operations related to cars'
            },
            {
                name: 'CarTypes',
                description: 'Operations related to car types'
            },
            {
                name: 'Products',
                description: 'Operations related to products'
            },
            {
                name: 'ProductCategories',
                description: 'Operations related to product categories'
            },
            {
                name: 'Service',
                description: 'Operations related to service'
            },

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
                 CarType: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         name: {
                             type: 'string',
                         },
                         design: {
                             type: 'string',
                         },
                         performance: {
                             type: 'integer',
                         },
                         selfWeight: {
                             type: 'integer',
                         },
                         numberOfSeats: {
                             type: 'integer',
                         },
                         fuel: {
                             type: 'string',
                         },
                         usefulWeight: {
                             type: 'integer',
                         },
                     },
                 },
                 Car: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         name: {
                             type: 'string',
                         },
                         type: {
                             type: 'string',
                         },
                         licencePlate: {
                             type: 'string',
                         },
                         numberOfRegistrationLicence: {
                             type: 'string',
                         },
                         chassisNumber: {
                             type: 'string',
                         },
                         yearOfProduction: {
                             type: 'integer',
                         },
                         dateOfFirstRegistration: {
                             type: 'integer',
                         },
                         images: {
                             type: 'string',
                         },
                         dateOfDatabaseRegistration: {
                             type: 'integer',
                         },
                         dateOfLastTechnicalExamination: {
                             type: 'integer',
                         },
                         dateOfLastService: {
                             type: 'integer',
                         },
                         totalDrivenKm: {
                             type: 'integer',
                         },
                         totalTransport: {
                             type: 'integer',
                         },
                     },
                 },
                 Service: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         appointment: {
                             type: 'string',
                         },
                         nameOfServiceCompany: {
                             type: 'string',
                         },
                         driverName: {
                             type: 'string',
                         },
                         dateOfRecording: {
                             type: 'string',
                         },
                         grossSumPrice: {
                             type: 'integer',
                         },
                         netSumPrice: {
                             type: 'integer',
                         },
                         VAT: {
                             type: 'integer',
                         },
                         title: {
                             type: 'string',
                         },
                         description: {
                             type: 'string',
                         },
                         reparation: {
                             type: 'string',
                         },
                         car: {
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