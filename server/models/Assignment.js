import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    description: {
        type: String,
        required: false
    },
    course: {
        type: String,
        required: [true, 'Please add a course name or code']
    },
    dueDate: {
        type: Date,
        required: [true, 'Please add a due date']
    },
    teacherId: {
        type: mongoose.Schema.ObjectId,
        ref: 'teacher',
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Assignment', AssignmentSchema);