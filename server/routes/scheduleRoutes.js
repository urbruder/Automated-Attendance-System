import express from 'express';
import { createSchedule, getMyWeeklySchedule, getMyScheduleForToday } from '../controllers/scheduleController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/mytoday', authorize('teacher'), getMyScheduleForToday);
router.get('/myweek', authorize('teacher'), getMyWeeklySchedule); // <-- New route
router.post('/', authorize('teacher'), createSchedule); // <-- New route

export default router;