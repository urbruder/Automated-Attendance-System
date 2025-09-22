// models/Student.js
import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true
    },
    faceEmbedding: {
        type: [Number],
        default: []
    },
    courses: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Course'
    }]
}, { collection: 'students' });

export default mongoose.model('student', StudentSchema);

