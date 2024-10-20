import mongoose from 'mongoose';
import {v4 as uuidv4} from "uuid";

const calendarSchema = new mongoose.Schema({
    calendarId: {
        type: String,
        default: uuidv4,
    },
});

const Calendar = mongoose.model('Calendar', calendarSchema);

export default Calendar;