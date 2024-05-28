import Calendar from '../models/Calendar.js';

export const getAllCalendars = async (req, res) => {
    try {
        const calendars = await Calendar.find();
        res.status(200).json(calendars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCalendar = async (req, res) => {
    try {
        const { id } = req.params;
        const calendar = await Calendar.findById(id);
        res.status(200).json(calendar);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createCalendar = async (req, res) => {
    console.log('req', req);
    try {
        const {
            _id,
        } = req.body;
        const newCalendar = new Calendar({
            _id,
        });
        const savedCalendar = await newCalendar.save();
        res.status(201).json(savedCalendar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateCalendar = async (req, res) => {
    try {
        const { id } = req.params;
        const calendar = await Calendar.findById(id);
        if (!calendar) {
            return res.status(404).json({ message: 'Calendar not found' });
        }
        if (req.body._id) {
            calendar._id = req.body._id;
        }
        const updatedCalendar = await calendar.save();
        res.json(updatedCalendar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCalendar = async (req, res) => {
    try {
        const { id } = req.params;
        const calendar = await Calendar.findById(id);
        if (!calendar) {
            return res.status(404).json({ message: 'Calendar not found' });
        }
        await calendar.deleteOne();
        res.json({ message: 'Calendar deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};