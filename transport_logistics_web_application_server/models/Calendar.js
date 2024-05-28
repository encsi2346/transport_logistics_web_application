import mongoose from 'mongoose';

const calendarSchema = new mongoose.Schema({
    _id: String,
});

const Calendar = mongoose.model('Calendar', calendarSchema);

export default Calendar;