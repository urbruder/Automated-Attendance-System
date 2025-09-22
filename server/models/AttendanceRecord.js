// models/AttendanceRecord.js
import mongoose from 'mongoose';

const AttendanceRecordSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'student',
        required: true
    },
    scheduleId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Schedule',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true
    },
    markedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('AttendanceRecord', AttendanceRecordSchema);

