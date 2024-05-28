import mongoose from 'mongoose';
import {ProductStatus} from "./enums/ProductStatus.ts";
import ProductCategory from "./ProductCategory.js";

const productSchema = new mongoose.Schema({
    productId: String,
    name: String,
    description: String,
    category: ProductCategory,
    articleNumber: Number, //Cikkszám
    barcode: Number, //Vonalkód
    selfWeight: Number, //Önsúly
    maxNumberOfItems: Number, //Max darabszám
    currentNumberOfItems: Number, //Jelenlegi darabszám
    status: ProductStatus, //Állapot
});

const ProductCategory = mongoose.model('Product', productSchema);

export default ProductCategory;