import express from 'express';
import { updateProfile, updateSettings } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes in this file are protected
router.use(protect);

router.put('/me/profile', updateProfile);
router.put('/me/settings', updateSettings);

export default router;