import Product from '../models/Product.js';

export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createProduct = async (req, res) => {
    console.log('req', req);
    try {
        const {
            name,
            description,
            category,
            articleNumber,
            barcode,
            selfWeight,
            maxNumberOfItems,
            currentNumberOfItems,
            status
        } = req.body;
        const newProduct = new Product({
            name,
            description,
            category,
            articleNumber,
            barcode,
            selfWeight,
            maxNumberOfItems,
            currentNumberOfItems,
            status
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (req.body.name) {
            product.name = req.body.name;
            product.description = req.body.description;
            product.category = req.body.category;
            product.articleNumber = req.body.articleNumber;
            product.barcode = req.body.barcode;
            product.selfWeight = req.body.selfWeight;
            product.maxNumberOfItems = req.body.maxNumberOfItems;
            product.currentNumberOfItems = req.body.currentNumberOfItems;
            product.status = req.body.status;
        }
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.deleteOne();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};