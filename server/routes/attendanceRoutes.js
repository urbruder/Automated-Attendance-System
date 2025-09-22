// routes/attendanceRoutes.js
import express from 'express';
import { markAttendance, getStudentAttendance, getDailyAttendance } from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // Protect all routes in this file

router.post('/mark', authorize('teacher'), markAttendance);
router.get('/day', authorize('teacher'), getDailyAttendance);
router.get('/student/:studentId', getStudentAttendance);

export default router;

