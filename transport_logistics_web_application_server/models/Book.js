import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    id: Number,
    name: String
});

const Book = mongoose.model('Book', bookSchema);

export default Book;