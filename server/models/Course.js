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
});

export default mongoose.model('Course', CourseSchema);

