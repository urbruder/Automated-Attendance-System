import Schedule from '../models/Schedule.js';
import User from '../models/User.js';
import Course from '../models/Course.js';

/**
 * @desc    Create a new scheduled class
 * @route   POST /api/schedules
 * @access  Private (Teacher)
 */
export const createSchedule = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { courseId, dayOfWeek, startTime, endTime } = req.body;

        // Security Check: Make sure the teacher owns the course they're adding a schedule for
        const course = await Course.findById(courseId);
        if (!course || course.teacherId.toString() !== user.profileId.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to manage this course schedule.' });
        }

        const scheduleEntry = await Schedule.create({
            courseId,
            dayOfWeek,
            startTime,
            endTime
        });
        res.status(201).json({ success: true, data: scheduleEntry });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

/**
 * @desc    Get full weekly schedule for the logged-in teacher
 * @route   GET /api/schedules/myweek
 * @access  Private (Teacher)
 */
export const getMyWeeklySchedule = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const teacherCourses = await Course.find({ teacherId: user.profileId });
        const courseIds = teacherCourses.map(course => course._id);

        const schedule = await Schedule.find({ courseId: { $in: courseIds } })
            .populate('courseId', 'courseName')
            .sort({ dayOfWeek: 1, startTime: 1 }); // Sort by day and time

        res.status(200).json({ success: true, data: schedule });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

/**
 * @desc    Get schedule for today for the logged-in teacher
 * @route   GET /api/schedules/mytoday
 * @access  Private (Teacher)
 */
export const getMyScheduleForToday = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = days[new Date().getDay()];

        const teacherCourses = await Course.find({ teacherId: user.profileId });
        const courseIds = teacherCourses.map(course => course._id);

        const schedule = await Schedule.find({ 
            courseId: { $in: courseIds },
            dayOfWeek: today 
        }).populate('courseId', 'courseName');

        res.status(200).json({ success: true, data: schedule });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};