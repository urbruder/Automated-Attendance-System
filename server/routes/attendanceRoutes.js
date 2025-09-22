import express from 'express';
// 1. Import all necessary controller functions
import { 
    markAttendance, 
    getStudentAttendance, 
    getDailyAttendance,
    markAttendanceByFace,
    getMyAttendanceStats
} from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // Protect all routes in this file

// --- New Routes for recent features ---
router.get('/mystats', getMyAttendanceStats);
router.post('/markbyface', authorize('teacher'), markAttendanceByFace);

// --- Your Original Routes ---
router.post('/mark', authorize('teacher'), markAttendance);
router.get('/day', authorize('teacher'), getDailyAttendance);
router.get('/student/:studentId', getStudentAttendance);

export default router;