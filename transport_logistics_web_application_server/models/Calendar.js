import mongoose from 'mongoose';

const calendarSchema = new mongoose.Schema({
    calendarId: String,
});

const Calendar = mongoose.model('Calendar', calendarSchema);

export default Calendar;