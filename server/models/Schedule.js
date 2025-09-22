// models/Schedule.js
import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: true
    },
    dayOfWeek: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    startTime: {
        type: String, 
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

export default mongoose.model('Schedule', ScheduleSchema);

