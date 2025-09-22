// routes/studentRoutes.js
import express from 'express';
import { getStudents, getStudent, addStudentFaceData } from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // Protect all routes in this file

router.route('/')
    .get(authorize('teacher'), getStudents);
    
router.route('/:id')
    .get(getStudent);

router.route('/:id/facedata')
    .put(authorize('teacher'), addStudentFaceData);

export default router;

