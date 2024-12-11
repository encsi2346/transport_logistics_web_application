import mongoose from 'mongoose';
import {v4 as uuidv4} from "uuid";

const selectedProductSchema = new mongoose.Schema({
    selectedProductId: {
        type: String,
        default: uuidv4,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    productName: String,
    maxNumberOfItems: Number,
    currentNumberOfItems: Number,
    selectedNumberOfItems: Number,
    weightOfSelectedItems: Number,
});

const SelectedProduct = mongoose.model('SelectedProduct', selectedProductSchema);

export default SelectedProduct;