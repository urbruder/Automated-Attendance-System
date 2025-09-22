import express from 'express';
import { getAssignments, createAssignment } from '../controllers/assignmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
    .get(getAssignments)
    .post(authorize('teacher'), createAssignment);

export default router;