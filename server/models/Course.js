// models/Course.js
import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    teacherId: {
        type: mongoose.Schema.ObjectId,
        ref: 'teacher'
    },
        department: { // <-- Add this field
        type: String,
        required: true
    },
    academicYear: { // <-- Add this field
        type: String,
        required: true,
        enum: ['1st Year', '2nd Year', '3rd Year', '4th Year']
    }
});

export default mongoose.model('Course', CourseSchema);

