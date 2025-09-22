// controllers/studentController.js
import Student from '../models/Student.js';

export const getStudents = async (req, res, next) => {
    try {
        const students = await Student.find().populate('userId', 'email');
        res.status(200).json({ success: true, count: students.length, data: students });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        res.status(200).json({ success: true, data: student });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const addStudentFaceData = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        const { faceEmbedding } = req.body;
        if (!faceEmbedding || !Array.isArray(faceEmbedding)) {
             return res.status(400).json({ success: false, message: 'Please provide a valid face embedding array.' });
        }
        student.faceEmbedding = faceEmbedding;
        await student.save();
        res.status(200).json({ success: true, data: student });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

