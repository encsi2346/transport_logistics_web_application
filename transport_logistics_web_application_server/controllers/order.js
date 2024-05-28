import Order from '../models/Order.js';

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        res.status(200).json(order);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createOrder = async (req, res) => {
    console.log('req', req);
    try {
        const {
            _id,
            status,
            company,
            route,
            selectedProducts,
            totalWeightsOfSelectedProducts,
            departurePoint,
            destinationPoint,
            dockingPoints,
            results,
            documents,
            invoice,
            comments,
        } = req.body;
        const newOrder = new Order({
            _id,
            status,
            company,
            route,
            selectedProducts,
            totalWeightsOfSelectedProducts,
            departurePoint,
            destinationPoint,
            dockingPoints,
            results,
            documents,
            invoice,
            comments,
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (req.body._id) {
            order._id = req.body._id;
            order.status = req.body.status;
            order.company = req.body.company;
            order.route = req.body.route;
            order.selectedProducts = req.body.selectedProducts;
            order.totalWeightsOfSelectedProducts = req.body.totalWeightsOfSelectedProducts;
            order.departurePoint = req.body.departurePoint;
            order.destinationPoint = req.body.destinationPoint;
            order.dockingPoints = req.body.dockingPoints;
            order.results = req.body.results;
            order.documents = req.body.documents;
            order.invoice = req.body.invoice;
            order.comments = req.body.comments;
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.deleteOne();
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};