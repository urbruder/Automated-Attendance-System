// controllers/attendanceController.js
import AttendanceRecord from '../models/AttendanceRecord.js';
import Schedule from '../models/Schedule.js';
export const markAttendance = async (req, res, next) => {
    const { studentId, scheduleId, status } = req.body;
    try {
        if (!studentId || !scheduleId || !status) {
            return res.status(400).json({ success: false, message: 'Please provide studentId, scheduleId, and status' });
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const existingRecord = await AttendanceRecord.findOne({ studentId, scheduleId, date: today });
        if (existingRecord) {
            return res.status(409).json({ success: false, message: 'Attendance already marked for this student in this class today.' });
        }
        const attendance = await AttendanceRecord.create({ studentId, scheduleId, status, date: today });
        res.status(201).json({ success: true, data: attendance });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getStudentAttendance = async (req, res, next) => {
     try {
        const records = await AttendanceRecord.find({ studentId: req.params.studentId })
            .populate({
                path: 'scheduleId',
                populate: { path: 'courseId', select: 'courseName' }
            })
            .sort({ date: -1 });
        res.status(200).json({ success: true, data: records });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getDailyAttendance = async (req, res, next) => {
    const queryDate = req.query.date ? new Date(req.query.date) : new Date();
    queryDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(queryDate);
    nextDay.setDate(queryDate.getDate() + 1);
    try {
        const records = await AttendanceRecord.find({
            date: { $gte: queryDate, $lt: nextDay }
        }).populate('studentId', 'name rollNumber');
         res.status(200).json({ success: true, data: records });
    } catch (err) {
         res.status(500).json({ success: false, message: 'Server Error' });
    }
};

