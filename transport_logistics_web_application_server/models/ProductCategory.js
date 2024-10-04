import mongoose from 'mongoose';
import {ProductStatus} from "./states/ProductStatus.js";

const productCategorySchema = new mongoose.Schema({
    productCategoryId: String,
    name: String, //név
    description: String, //leírás
    status: {
        type: String,
        enum: Object.values(ProductStatus), // Use enum to enforce specific values
        default: ProductStatus.IN_STOCK, // Optional: set a default value
    }, //állapot TODO:külön kategória státusz?
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

export default ProductCategory;