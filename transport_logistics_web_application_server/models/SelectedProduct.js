import mongoose from 'mongoose';

const selectedProductSchema = new mongoose.Schema({
    selectedProductId: String,
    productId: String,
    productName: String,
    maxNumberOfItems: Number,
    currentNumberOfItems: Number,
    selectedNumberOfItems: Number,
    weightOfSelectedItems: Number,
});

const SelectedProduct = mongoose.model('SelectedProduct', selectedProductSchema);

export default SelectedProduct;