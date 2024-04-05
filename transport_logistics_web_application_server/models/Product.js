import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String, //TODO productCategory
    articleNumber: Number, //Cikkszám
    barcode: Number, //Vonalkód
    selfWeight: Number, //Önsúly
    maxNumberOfItems: Number, //Max darabszám
    currentNumberOfItems: Number, //Jelenlegi darabszám
    status: String, //Állapot TODO enum
});

const ProductCategory = mongoose.model('Product', productSchema);

export default ProductCategory;