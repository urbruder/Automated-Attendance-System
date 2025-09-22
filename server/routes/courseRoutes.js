import express from 'express';
import { createCourse, getMyCourses, getAllCourses } from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllCourses); 

router.use(protect);
router.get('/mycourses', authorize('teacher'), getMyCourses);
router.post('/', authorize('teacher'), createCourse); // <-- Add this route

export default router;