import SelectedProduct from '../models/SelectedProduct.js';

export const getAllSelectedProducts = async (req, res) => {
    try {
        const selectedProducts = await SelectedProduct.find();
        res.status(200).json(selectedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSelectedProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const selectedProduct = await SelectedProduct.findById(id);
        res.status(200).json(selectedProduct);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createSelectedProduct = async (req, res) => {
    console.log('req', req);
    try {
        const {
            _id,
            productId,
            productName,
            maxNumberOfItems,
            currentNumberOfItems,
            selectedNumberOfItems,
            weightOfSelectedItems,
        } = req.body;
        const newSelectedProduct = new SelectedProduct({
            _id,
            productId,
            productName,
            maxNumberOfItems,
            currentNumberOfItems,
            selectedNumberOfItems,
            weightOfSelectedItems,
        });
        const savedSelectedProduct = await newSelectedProduct.save();
        res.status(201).json(savedSelectedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateSelectedProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const selectedProduct = await SelectedProduct.findById(id);
        if (!selectedProduct) {
            return res.status(404).json({ message: 'SelectedProduct not found' });
        }
        if (req.body._id) {
            selectedProduct._id = req.body._id;
            selectedProduct.productId = req.body.productId;
            selectedProduct.productName = req.body.productName;
            selectedProduct.maxNumberOfItems = req.body.maxNumberOfItems;
            selectedProduct.currentNumberOfItems = req.body.currentNumberOfItems;
            selectedProduct.selectedNumberOfItems = req.body.selectedNumberOfItems;
            selectedProduct.weightOfSelectedItems = req.body.weightOfSelectedItems;
        }
        const updatedSelectedProduct = await selectedProduct.save();
        res.json(updatedSelectedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSelectedProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const selectedProduct = await SelectedProduct.findById(id);
        if (!selectedProduct) {
            return res.status(404).json({ message: 'SelectedProduct not found' });
        }
        await selectedProduct.deleteOne();
        res.json({ message: 'SelectedProduct deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};