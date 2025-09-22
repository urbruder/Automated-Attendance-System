import Course from '../models/Course.js';
import User from '../models/User.js';

// @desc    Get courses for the logged-in teacher
// @route   GET /api/courses/mycourses
// @access  Private (Teacher)
export const getMyCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const courses = await Course.find({ teacherId: user.profileId });
        res.status(200).json({ success: true, data: courses });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};