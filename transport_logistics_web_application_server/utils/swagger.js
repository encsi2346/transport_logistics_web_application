import swaggerJSDoc from 'swagger-jsdoc'
import {ERROR} from "mongodb/src/constants.js";

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
                         userId: {
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
                         productCategoryId: {
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
                         productId: {
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
                             $ref: '#/components/schemas/ProductStatus',
                         },
                     },
                 },
                 CarType: {
                     type: 'object',
                     properties: {
                         carTypeId: {
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
                         carId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         name: {
                             type: 'string',
                         },
                         type: {
                             $ref: '#/components/schemas/CarType',
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
                         serviceId: {
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
                         commentId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         orderId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         userId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         userName: {
                             type: 'string',
                         },
                         type: {
                             $ref: '#/components/schemas/CommentType',
                         },
                         timeStamp: {
                             type: 'string',
                             format: 'date-time',
                         },
                         description: {
                             type: 'string',
                         },
                     },
                 },
                 Request: {
                     type: 'object',
                     properties: {
                         requestId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         title: {
                             type: 'string',
                         },
                         selectedDate: {
                             type: 'string',
                             format: 'date-time',
                         },
                         reason: {
                             type: 'string',
                         },
                         status: {
                             $ref: '#/components/schemas/RequestStatus',
                         },
                         answerId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         userId: {
                             type: 'string',
                             format: 'uuid',
                         },
                     },
                 },
                 Answer: {
                     type: 'object',
                     properties: {
                         answerId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         requestId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         answerOption: {
                             $ref: '#/components/schemas/AnswerOption',
                         },
                         reason: {
                             type: 'string',
                         },
                         userId: {
                             type: 'string',
                             format: 'uuid',
                         }
                     },
                 },
                 Transportation: {
                     type: 'object',
                     properties: {
                         transportationId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         selectedCarType: {
                             $ref: '#/components/schemas/CarType',
                         },
                         selectedCar: {
                             $ref: '#/components/schemas/Car',
                         },
                         departurePoint: {
                             $ref: '#/components/schemas/DockingPoint',
                         },
                         destinationPoint: {
                             $ref: '#/components/schemas/DockingPoint',
                         },
                         dockingPoints: {
                             type: 'array',
                             items: {
                                 $ref: '#/components/schemas/DockingPoints',
                             }
                         },
                         selectedProducts: {
                             type: 'array',
                             items: {
                                 $ref: '#/components/schemas/SelectedProduct',
                             }
                         },
                         totalWeightsOfSelectedProducts: {
                             type: 'integer',
                         }
                     },
                 },
                 DockingPoint: {
                   type: 'object', /* TODO: ha plusz rakodó pontnál kell megállni ott jelöljük e itt?*/
                   properties: {
                       dockingPointId: {
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
                       departureDate: {
                           type: 'string',
                           format: 'date',
                       },
                       departureTime: {
                           type: 'string',
                           format: 'time',
                       },
                       destinationDate: {
                           type: 'string',
                           format: 'date',
                       },
                       destinationTime: {
                           type: 'string',
                           format: 'time',
                       },
                       isItOwnLocation: { /*ez a konkrét telephely-e*/
                           type: 'boolean',
                       },
                       name: {
                           type: 'string',
                       },
                       driverId: {
                           type: 'string',
                           format: 'uuid',
                       },
                       driverName: {
                           type: 'string'
                       },
                       passengers: {
                           type: 'array',
                           items: {
                               $ref: '#/components/schemas/User',
                           }
                       },
                   }
                 },
                 SelectedProduct: {
                     type: 'object',
                     properties: {
                         selectedProductId: { //TODO: kell itt külön id?
                             type: 'string',
                             format: 'uuid',
                         },
                         productId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         productName: {
                             type: 'string',
                         },
                         maxNumberOfItems: {
                             type: 'integer',
                         },
                         currentNumberOfItems: {
                             type: 'integer',
                         },
                         selectedNumberOfItems: {
                             type: 'integer',
                         },
                         weightOfSelectedItems: {
                             type: 'integer',
                         }
                     }
                 },
                 Calendar: { /*TODO: kidolgozni a részleteit*/
                     type: 'object',
                     properties: {
                         calendarId: {
                             type: 'string',
                             format: 'uuid',
                         },
                     },
                 },
                 Order: {
                     type: 'object',
                     properties: {
                         orderId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         status: {
                             $ref: '#/components/schemas/OrderStatus',
                         },
                         company: {
                             $ref: '#/components/schemas/Company',
                         },
                         route: {
                             type: 'array',
                             items: {
                                 $ref: '#/components/schemas/Route',
                             }
                         },
                         selectedProducts: {
                             type: 'array',
                             items: {
                                 $ref: '#/components/schemas/SelectedProduct',
                             }
                         },
                         totalWeightsOfSelectedProducts: {
                             type: 'integer',
                         },
                         departurePoint: {
                             $ref: '#/components/schemas/DockingPoint',
                         },
                         destinationPoint: {
                             $ref: '#/components/schemas/DockingPoint',
                         },
                         dockingPoints: {
                             type: 'array',
                             items: {
                                 $ref: '#/components/schemas/DockingPoint',
                             }
                         },
                         results: {
                             $ref: '#/components/schemas/Result',
                         },
                         documents: {
                             type: 'array',
                             items: {
                                 $ref: '#/components/schemas/Document',
                             }
                         },
                         invoice: {
                             $ref: '#/components/schemas/Invoice',
                         },
                         comments: {
                             type: 'array',
                             items: {
                                 $ref: '#/components/schemas/Comment',
                             }
                         },
                     },
                 },
                 Route: {
                     type: 'object',
                     properties: {
                         routeId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         scheduledArrival: {
                             type: 'string'
                         },
                         actualArrival: {
                             type: 'string'
                         },
                         address: {
                             $ref: '#/components/schemas/Address',
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
                         status: {
                             $ref: '#/components/schemas/RouteStatus',
                         },
                     },
                 },
                 Address: {
                     type: 'object',
                     properties: {
                         addressId: {
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
                         companyId: {
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
                         resultId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         orderId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         customer: {
                             $ref: '#/components/schemas/Company',
                         },
                         driverId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         driverName: {
                             type: 'string',
                         },
                         driverEmail: {
                             type: 'string',
                         },
                         scheduledKms: {
                             type: 'string',
                         },
                         typeOfProducts: {
                             type: 'string',
                         },
                         contactPersonName: {
                             type: 'string',
                         },
                         contactPersonPhone: {
                             type: 'string',
                         },
                         contactPersonEmail: {
                             type: 'string',
                         },
                         carId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         licencePlateOfCar: {
                             type: 'string',
                         },
                         typeOfCar: {
                             type: 'string',
                         },
                         typeOfName: {
                             type: 'string',
                         },
                         scheduledTime: {
                             type: 'string',
                         },
                         description: {
                             type: 'string',
                         },
                         price: {
                             type: 'integer',
                         },
                         profit: {
                             type: 'integer',
                         },
                         expenses: {
                             type: 'integer',
                         }
                     },
                 },
                 Document: {
                     type: 'object',
                     properties: {
                         documentId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         documentType: {
                             $ref: '#/components/schemas/DocumentType',
                         },
                         title: {
                             type: 'string'
                         },
                         timeStamp: {
                             type: 'string',
                             format: 'date-time',
                         },
                         status: {
                             $ref: '#/components/schemas/DocumentStatus',
                         },
                     },
                 },
                 Invoice: { /*TODO: ehhez meg kell néznem pontosan milyen adatok kellenek realben*/
                     type: 'object',
                     properties: {
                         invoiceId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         orderId: {
                             type: 'string',
                             format: 'uuid',
                         },
                         companyId: {
                             type: 'string',
                             format: 'uuid',
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
                         status: {
                             $ref: '#/components/schemas/InvoiceStatus'
                         },
                     },
                 },
                 CommentType: {
                     type: 'string',
                     enum:
                         - ERROR
                         - WARNING
                         - INFO
                 },
                 ProductStatus: {
                     type: 'string',
                     enum:
                         - IN_STOCK /*készleten*/
                         - STOCK_SHORTAGE /*készlethiány*/
                 },
                 RequestStatus: {
                     type: 'string',
                     enum:
                         - DRAFT /*Piszkozat*/
                         - PENDING /*Függőben*/
                         - ACCEPTED /*Elfogadva*/
                         - REFUSED /*Elutasítva*/
                 },
                 AnswerOption: {
                     type: 'string',
                     enum:
                         - ACCEPT
                         - REFUSE
                 },
                 OrderStatus: {
                     type: 'string',
                     enum:
                         - ONGOING /*folyamatban*/
                         - COMPLETED /*teljesített*/
                         - DELETED /*törölt*/
                         - ORDERED /*megrendelve*/
                 },
                 RouteStatus: {
                     type: 'string',
                     enum:
                         - ONGOING /*folyamatban*/
                         - COMPLETED /*teljesített*/
                         - DELETED /*törölve*/
                         - PENDING /*teljesítésre vár*/
                         - SKIPPED /*kihagyva*/
                 },
                 DocumentType: {
                     type: 'string',
                     enum:
                         - TRANSPORTBILL /*fuvarlevél*/
                         - DELIVERYBILL /*szállítólevél*/
                         - INVOICE /*számla*/
                         - JOURNEYBILL /*menetlevél*/
                         - DRIVING_LICENCE /*jogosítvány*/
                         - ADDRESS_CARD /*lakcímkártya*/
                         - PASSPORT /*útlevél*/
                         - HEALTH_CARD /*taj kártya*/
                         - OTHER /*egyéb*/
                 },
                 DocumentStatus: {
                     type: 'string',
                     enum:
                         - MISSING /*hiányzik*/
                         - UPLOADED /*feltöltve*/
                         - WAITING_FOR_UPLOAD /*feltöltésre vár*/
                         - WILL_BE_GENERATED /*generálódik*/
                 },
                 InvoiceStatus: {
                     type: 'string',
                     enum:
                         - CREATED_BY /*létrehozva*/
                         - PAID /*fizetve*/
                         - WAITING_FOR_PAYMENT /*fizetésre vár*/
                         - DELETED /*törölve*/
                 },
             },
        },
    },
    apis: ['./routes/*.js'],
}

export const swaggerSpec = swaggerJSDoc(options);