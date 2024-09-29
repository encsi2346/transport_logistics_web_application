import Request from '../models/Request.js';

export const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await Request.findById(id);
        res.status(200).json(request);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createRequest = async (req, res) => {
    console.log('req', req);
    try {
        const {
            requestId,
            title,
            typeOfRequest,
            selectedDate,
            reason,
            status,
            answerId,
            userId,
        } = req.body;
        const newRequest = new Request({
            requestId,
            title,
            typeOfRequest,
            selectedDate,
            reason,
            status,
            answerId,
            userId,
        });
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await Request.findById(id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        if (req.body.requestId) {
            request.requestId = req.body.requestId;
            request.title = req.body.title;
            request.typeOfRequest = req.body.typeOfRequest;
            request.selectedDate = req.body.selectedDate;
            request.reason = req.body.reason;
            request.status = req.body.status;
            request.answerId = req.body.answerId;
            request.userId = req.body.userId;
        }
        const updatedRequest = await request.save();
        res.json(updatedRequest);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await Request.findById(id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        await request.deleteOne();
        res.json({ message: 'Request deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};