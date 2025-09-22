import Course from '../models/Course.js';
import User from '../models/User.js';

/**
 * @desc    Create a new course
 * @route   POST /api/courses
 * @access  Private (Teacher)
 */
export const createCourse = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        req.body.teacherId = user.profileId; // Assign the logged-in teacher

        const { courseName, department, academicYear } = req.body;
        if (!courseName || !department || !academicYear) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
        }

        const course = await Course.create(req.body);
        res.status(201).json({ success: true, data: course });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

/**
 * @desc    Get courses for the logged-in teacher
 * @route   GET /api/courses/mycourses
 * @access  Private (Teacher)
 */
export const getMyCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const courses = await Course.find({ teacherId: user.profileId });
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

/**
 * @desc    Get all available courses for the registration page
 * @route   GET /api/courses
 * @access  Public
 */
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};