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
            {
                name: 'Comment',
                description: 'Operations related to comment'
            },
            {
                name: 'Request',
                description: 'Operations related to request'
            },
            {
                name: 'Transportation',
                description: 'Operations related to transportation'
            },
            {
                name: 'Calendar',
                description: 'Operations related to calendar'
            },
            {
                name: 'Order',
                description: 'Operations related to order'
            },
            {
                name: 'Document',
                description: 'Operations related to document'
            },
            {
                name: 'Invoice',
                description: 'Operations related to invoice'
            },
            {
                name: 'Answer',
                description: 'Operations related to answer'
            },
            {
                name: 'DockingPoint',
                description: 'Operations related to docking points'
            },
            {
                name: 'SelectedProduct',
                description: 'Operations related to selected product'
            },
            {
                name: 'Route',
                description: 'Operations related to route'
            },
            {
                name: 'Address',
                description: 'Operations related to address'
            },
            {
                name: 'Company',
                description: 'Operations related to company'
            },
            {
                name: 'Result',
                description: 'Operations related to result'
            },
        ],
         components: {
             schemas: {
                 User: {
                     type: 'object', //TODO: hiányoznak a változók
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
                 Comment: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         orderId: {
                             type: 'string',
                         },
                         userId: {
                             type: 'string',
                         },
                         userName: {
                             type: 'string',
                         },
                         type: { //TODO: enum
                             type: 'string',
                         },
                         timeStamp: { //TODO: datetime
                             type: 'string',
                         },
                         description: {
                             type: 'string',
                         },
                     },
                 },
                 Request: { /*a beosztáshoz kapcsolódó kérés*/
                     type: 'object', //TODO
                     properties: {
                         requestId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         title: {
                             type: 'string',
                         },
                         selectedDate: { //TODO:datetime
                             type: 'string',
                         },
                         reason: {
                             type: 'string',
                         },
                         status: { //TODO:enum
                             type: 'string',
                         },
                         answerId: {
                             type: 'string',
                         },
                         userId: {
                             type: 'string',
                         },
                     },
                 },
                 Answer: { /* a beosztáshoz kapcsolódó kérésre a válasz*/
                     type: 'object',
                     properties: {
                         answerId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         requestId: {
                             type: 'string',
                         },
                         status: { //TODO: enum
                             type: 'string',
                         },
                         reason: {
                             type: 'string',
                         },
                     },
                 },
                 Transportation: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         selectedCarType: { //TODO:carType
                             type: 'string',
                         },
                         selectedCar: { //TODO:car
                             type: 'string',
                         },
                         departurePoint: { //TODO: DockingPoint
                             type: 'string',
                         },
                         destinationPoint: { //TODO: DockingPoint
                             type: 'string',
                         },
                         dockingPoints: { //TODO: DockingPoints
                             type: 'array',
                             items: {
                                 type: 'string'
                             }
                         },
                         selectedProducts: { //TODO: SelectedProducts
                             type: 'array',
                             items: {
                                 type: 'string'
                             }
                         },
                         totalWeightsOfSelectedProducts: {
                             type: 'integer'
                         }
                     },
                 },
                 DockingPoint: {
                   type: 'object', /* ha plusz rakodó pontnál kell megállni ott jelöljük e itt?*/
                   properties: {
                       _id: {
                           type: 'string',
                           format: 'uuid',
                       },
                       country: {
                           type: 'string',
                       },
                       postcode: {
                           type: 'string',
                       },
                       city: {
                           type: 'string',
                       },
                       nameOfPublicArea: {
                           type: 'string',
                       },
                       typeOfPublicArea: {
                           type: 'string',
                       },
                       houseNumber: {
                           type: 'string',
                       },
                       departureDate: { //TODO:date
                           type: 'string',
                       },
                       departureTime: { //TODO:time
                           type: 'string',
                       },
                       destinationDate: { //TODO:date
                           type: 'string',
                       },
                       destinationTime: { //TODO: time
                           type: 'string',
                       },
                       isItOwnLocation: { /*ez a konkrét telephely-e*/
                           type: 'boolean',
                       },
                       driverId: { //TODO: userId
                           type: 'string'
                       },
                       driverName: { //TODO: userName
                           type: 'string'
                       },
                       passengers: { //TODO: userek idvel nammel
                           type: 'array',
                           items: {
                               type: 'string'
                           }
                       },
                   }
                 },
                 SelectedProduct: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string'
                         },
                         productId: {
                             type: 'string'
                         },
                         productName: {
                             type: 'string'
                         },
                         maxNumberOfItems: {
                             type: 'integer',
                         },
                         currentNumberOfItems: {
                             type: 'integer',
                         },
                         selectedNumberOfItems: {
                             type: 'integer'
                         },
                         weightOfSelectedItems: {
                             type: 'integer'
                         }
                     }
                 },
                 Calendar: { /*kidolgozni a részleteit*/
                     type: 'object', //TODO
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                     },
                 },
                 Order: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         status: { //TODO: enum
                             type: 'string',
                         },
                         company: { //TODO: Company
                             type: 'string',
                         },
                         route: { //TODO: Route
                             type: 'array',
                             items: {
                                 type: 'string'
                             }
                         },
                         selectedProducts: { //TODO: SelectedProducts
                             type: 'array',
                             items: {
                                 type: 'string'
                             }
                         },
                         totalWeightsOfSelectedProducts: {
                             type: 'integer'
                         },
                         departurePoint: { //TODO: DockingPoint
                             type: 'string',
                         },
                         destinationPoint: { //TODO: DockingPoint
                             type: 'string',
                         },
                         dockingPoints: { //TODO: DockingPoints
                             type: 'array',
                             items: {
                                 type: 'string'
                             }
                         },
                         results: { //TODO: Result
                             type: 'string',
                         },
                         documents: { //TODO: Document
                             type: 'array',
                             items: {
                                 type: 'string'
                             }
                         },
                         invoice: { //TODO: Invoice
                             type: 'string'
                         },
                         comments: { //TODO: Comment
                             type: 'array',
                             items: {
                                 type: 'string'
                             }
                         },
                     },
                 },
                 Route: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         scheduledArrival: {
                             type: 'string'
                         },
                         actualArrival: {
                             type: 'string'
                         },
                         address: { //TODO: Address
                             type: 'string'
                         },
                         task: {
                             type: 'string'
                         },
                         drivingKms: {
                             type: 'string'
                         },
                         drivingHours: {
                             type: 'string'
                         },
                         scheduledDeparture: {
                             type: 'string'
                         },
                         actualDeparture: {
                             type: 'string'
                         },
                         status: { //TODO: enum
                             type: 'string'
                         },
                     },
                 },
                 Address: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         country: {
                             type: 'string',
                         },
                         postcode: {
                             type: 'string',
                         },
                         city: {
                             type: 'string',
                         },
                         nameOfPublicArea: {
                             type: 'string',
                         },
                         typeOfPublicArea: {
                             type: 'string',
                         },
                         houseNumber: {
                             type: 'string',
                         },
                     }
                 },
                 Company: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         companyName: {
                             type: 'string'
                         },
                         email: {
                             type: 'string'
                         },
                         phoneNumber: {
                             type: 'string'
                         },
                         contactPersonName: {
                             type: 'string'
                         }
                     },
                 },
                 Result: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         customer: {
                             type: 'string' //TODO: Company
                         },
                         driverId: {
                             type: 'string'
                         },
                         driverName: {
                             type: 'string'
                         },
                         driverEmail: {
                             type: 'string'
                         },
                         scheduledKms: {
                             type: 'string'
                         },
                         typeOfProducts: {
                             type: 'string'
                         },
                         contactPersonName: {
                             type: 'string'
                         },
                         contactPersonPhone: {
                             type: 'string'
                         },
                         contactPersonEmail: {
                             type: 'string'
                         },
                         carId: {
                             type: 'string'
                         },
                         licencePlateOfCar: {
                             type: 'string'
                         },
                         typeOfCar: {
                             type: 'string'
                         },
                         typeOfName: {
                             type: 'string'
                         },
                         scheduledTime: {
                             type: 'string'
                         },
                         description: {
                             type: 'string'
                         },
                         price: {
                             type: 'integer'
                         },
                         profit: {
                             type: 'integer'
                         },
                         expenses: {
                             type: 'integer'
                         }
                     },
                 },
                 Document: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         documentType: { //TODO: enum
                             type: 'string'
                         },
                         title: {
                             type: 'string'
                         },
                         timeStamp: { //TODO: DateTime
                             type: 'string'
                         },
                         status: {
                             type: 'string'
                         },
                     },
                 },
                 Invoice: { /*ehhez meg kell néznem pontosan milyen adatok kellenek realben*/
                     type: 'object', //TODO
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         orderId: {
                             type: 'string'
                         },
                         companyName: {
                             type: 'string'
                         },
                         dateOfCreation: {
                             type: 'string'
                         },
                         deadlineForPayment: {
                             type: 'string'
                         },
                         price: {
                             type: 'integer'
                         },
                         status: { //TODO: enum
                             type: 'string'
                         },
                     },
                 },
             },
        },
    },
    apis: ['./routes/*.js'],
}

export const swaggerSpec = swaggerJSDoc(options);