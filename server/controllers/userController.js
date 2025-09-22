import User from '../models/User.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';

// @desc    Update user profile details
// @route   PUT /api/users/me/profile
// @access  Private
export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update email on the User model
        user.email = req.body.email || user.email;
        await user.save();

        // Update name on the specific profile model (Student or Teacher)
        const ProfileModel = user.role === 'student' ? Student : Teacher;
        const profile = await ProfileModel.findById(user.profileId);
        
        if (profile) {
            profile.name = req.body.name || profile.name;
            await profile.save();
        }

        res.status(200).json({ success: true, message: 'Profile updated successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Update user settings
// @route   PUT /api/users/me/settings
// @access  Private
export const updateSettings = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { settings: req.body },
            { new: true, runValidators: true }
        );
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        res.status(200).json({ success: true, data: user.settings });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};