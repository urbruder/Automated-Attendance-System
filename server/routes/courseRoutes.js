import express from 'express';
import { getMyCourses } from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/mycourses', authorize('teacher'), getMyCourses);

export default router;