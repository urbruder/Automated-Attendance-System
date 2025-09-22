import AttendanceRecord from '../models/AttendanceRecord.js';
import Schedule from '../models/Schedule.js';
import Student from '../models/Student.js';
import User from '../models/User.js';

// --- Your Original Functions ---

export const markAttendance = async (req, res, next) => {
    const { studentId, scheduleId, status } = req.body;
    try {
        if (!studentId || !scheduleId || !status) {
            return res.status(400).json({ success: false, message: 'Please provide studentId, scheduleId, and status' });
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const existingRecord = await AttendanceRecord.findOne({ studentId, scheduleId, date: { $gte: today } });
        if (existingRecord) {
            return res.status(409).json({ success: false, message: 'Attendance already marked for this student in this class today.' });
        }
        const attendance = await AttendanceRecord.create({ studentId, scheduleId, status, date: new Date() });
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


// --- New Functions for Recent Features ---

export const markAttendanceByFace = async (req, res) => {
    const { rollNumber, scheduleId } = req.body;
    try {
        const student = await Student.findOne({ rollNumber });
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existingRecord = await AttendanceRecord.findOne({
            studentId: student._id,
            scheduleId: scheduleId,
            date: { $gte: today }
        });

        if (existingRecord) {
            return res.status(200).json({ success: true, message: 'Attendance already marked', data: { studentName: student.name, ...existingRecord.toObject() } });
        }

        const attendanceRecord = await AttendanceRecord.create({
            studentId: student._id,
            scheduleId: scheduleId,
            date: new Date(),
            status: 'Present'
        });

        res.status(201).json({ success: true, data: { studentName: student.name, ...attendanceRecord.toObject() } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getMyAttendanceStats = async (req, res) => {
    try {
        // We need the Student profile to find attendance records
        const studentProfile = await Student.findOne({ userId: req.user.id });
        if (!studentProfile) {
            return res.status(404).json({ success: false, message: 'Student profile not found.' });
        }

        const records = await AttendanceRecord.find({ studentId: studentProfile._id });
        
        const presentCount = records.filter(r => r.status === 'Present').length;
        const totalCount = records.length;
        const percentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

        res.status(200).json({ success: true, data: { present: presentCount, total: totalCount, percentage } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};