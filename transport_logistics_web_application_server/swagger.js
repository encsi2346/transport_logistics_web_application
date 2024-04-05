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
                 Book: {
                     type: 'object',
                     properties: {
                         _id: {
                             type: 'string',
                             format: 'uuid',
                         },
                         name: {
                             type: 'string',
                         },
                     },
                 },
             },
        },
    },
    apis: ['./routes/*.js'],
    //apis: ['./index.js']
}

export const swaggerSpec = swaggerJSDoc(options);



/*const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.use(express.json())
var database

app.get('/', (req, resp) => {
    resp.send('Welcome to mongodb API')
})

app.get('/api/books', (req, resp) => {
    database.collection('books').find({}).toArray((err, result) => {
        if(err) throw err
        resp.send(result)
    })
})

app.get('/api/books/:id', (req, resp) => {
    database.collection('books').find({id: parseInt(req.params.id)}).toArray((err, result) => {
        if(err) throw err
        resp.send(result)
    })
})

app.post('/api/books/addBook', (req, resp) => {
    let res = database.collection('books').find({}).sort({id: -1}).limit(1)
    res.forEach(obj => {
        if(obj){
            let book = {
                id: obj.id + 1,
                title: req.body.title
            }
            database.collection('books').insertOne(book, (err, result) => {
                if(err) resp.status(500).send(err)
                resp.send('Added successfully')
            })
        }
    })
})

app.put('/api/books/:id', (req, resp) => {
    let book = {
        id: parseInt(req.params.id),
        title: req.body.title
    }
    database.collection('books').updateOne(
        {id: parseInt(req.params.id)},
        {$set: book}, (err, result) => {
            if(err) throw err
            resp.send(book)
        }
    )
})

app.delete('/api/books/:id', (req, resp) => {
    database.collection('books').deleteOne({id: parseInt(req.params.id)}, (error, result) => {
        if(error) throw error
        resp.send('Book is deleted')
    })
})

app.listen(3001, () => {
    MongoClient.connect('mongodb://localhost:6001', { useNewUrlParser: true}, (error, result) => {
        if(error) throw error
        database = result.db('mydatabase')
        console.log('Connection successful')
    })
})*/