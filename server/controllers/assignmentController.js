import Assignment from '../models/Assignment.js';
import User from '../models/User.js';

// @desc    Get all assignments
// @route   GET /api/assignments
// @access  Private (Students and Teachers)
export const getAssignments = async (req, res) => {
    try {
        let assignments;
        // If the user is a teacher, only show assignments they created.
        if (req.user.role === 'teacher') {
            const teacherProfile = await User.findById(req.user.id);
            assignments = await Assignment.find({ teacherId: teacherProfile.profileId }).sort({ dueDate: 1 });
        } else {
            // Students see all assignments for now. 
            // This could be filtered by courses in the future.
            assignments = await Assignment.find().sort({ dueDate: 1 });
        }
        res.status(200).json({ success: true, data: assignments });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create a new assignment
// @route   POST /api/assignments
// @access  Private (Teachers only)
export const createAssignment = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        req.body.teacherId = user.profileId; // Attach teacher's profile ID

        const assignment = await Assignment.create(req.body);
        res.status(201).json({ success: true, data: assignment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};