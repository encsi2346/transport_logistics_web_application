#mongodb cloud:
https://cloud.mongodb.com/v2/6410716945596c236cf468b8#/clusters

#connect sort ellenőrizni hogy jó e
#jelenlegi ip engedélyezve van e 

#indítás parancs: node index.js

#metódusok

- transportation:
--createTransportation
--updateTransportation/id
--removeTransportation/id
--getTransportation/id
--getTransportations

- cars:
--getCar/id
--createCar
--getCars (all vagy typeban all)
--updateCar/id
--deleteCar/id

- car-types: 
--getCarType/id
--createCarType
--getCarTypes
--updateCarTypes/id
--deleteCarTypes/id

- users:
--getUser/id
--deleteUser/id
--updateUser/id
--getUsers
--createUser (uploadImage??)

- calendar: 
--getCalender (all)
--getCalendar/id (somebodys calendar)
--addNewEvent (??)
--removeEvent (??)
--getEvent (??)

- requests: 
--createRequest
--removeRequest/id
--getRequest/id
--getRequests/is
--approveRequest/id
--declineRequest/id

- products:
--getProduct/id
--deleteProduct/id
--updateProduct/id
--getProducts
--createProduct

--getProductType/id
--deleteProductType/id
--updateProductType/id
--getProductTypes
--createProductTypes

- orders:
--getOrders
--getOrder/id
--createOrder
--updateOrder/id
--removeOrder/id

- documents:
--uploadDocument
--removeDocument
--getDocument/id
--getDocuments

- invoices:
--createInvoice
--updateInvoice
--getInvoice/id
--getInvoices
--removeInvoice/id