// models/Teacher.js
import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
     userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    department: {
        type: String
    }
}, { collection: 'teachers' });

export default mongoose.model('teacher', TeacherSchema);

