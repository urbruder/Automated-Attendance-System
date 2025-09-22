import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import User from '../models/User.js';
import Course from '../models/Course.js';

/**
 * @desc    Get students, filtered by the logged-in teacher's department.
 * @route   GET /api/students
 * @access  Private (Teacher)
 */
export const getStudents = async (req, res, next) => {
    try {
        // Find the logged-in user to get their profile ID
        const user = await User.findById(req.user.id);
        
        // Find the teacher's profile to get their department
        const teacherProfile = await Teacher.findById(user.profileId);

        if (!teacherProfile || !teacherProfile.department) {
            return res.status(404).json({ success: false, message: 'Teacher profile or department not found.' });
        }
        
        const teacherDepartment = teacherProfile.department;

        // Find all students who are in the same department as the teacher
        const students = await Student.find({ department: teacherDepartment }).populate('userId', 'email');

        res.status(200).json({ success: true, count: students.length, data: students });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

/**
 * @desc    Get a single student by ID.
 * @route   GET /api/students/:id
 * @access  Private
 */
export const getStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        
        // Future Enhancement: A teacher should only be able to get a student from their own department.
        res.status(200).json({ success: true, data: student });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

/**
 * @desc    Add face embedding data to a student profile.
 * @route   PUT /api/students/:id/facedata
 * @access  Private (Teacher)
 */
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
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};