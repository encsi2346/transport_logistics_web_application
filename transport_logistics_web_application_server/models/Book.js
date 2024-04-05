import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    name: String
});

const Book = mongoose.model('Book', bookSchema);

export default Book;