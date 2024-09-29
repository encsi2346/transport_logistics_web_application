import mongoose from 'mongoose';
import {ProductStatus} from "./states/ProductStatus.js";

const productCategorySchema = new mongoose.Schema({
    productCategoryId: String,
    name: String, //név
    description: String, //leírás
    status: ProductStatus, //állapot TODO:külön kategória státusz?
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

export default ProductCategory;