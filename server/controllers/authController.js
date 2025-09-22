// controllers/authController.js
import User from '../models/User.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import jwt from 'jsonwebtoken';

const sendTokenResponse = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.status(statusCode).json({
        success: true,
        token,
        user: {
            _id: user._id,
            email: user.email,
            role: user.role,
            profile: user.profileId
        }
    });
};

export const register = async (req, res, next) => {
    const { name, email, password, role, rollNumber, department } = req.body;
    try {
        const user = await User.create({ email, password, role });
        let profile;
        if (role === 'student') {
            profile = await Student.create({ userId: user._id, name, rollNumber });
        } else if (role === 'teacher') {
            profile = await Teacher.create({ userId: user._id, name, department });
        }
        user.profileId = profile._id;
        await user.save();
        sendTokenResponse(user, 201, res);
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }
    const user = await User.findOne({ email }).select('+password').populate('profileId');
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    sendTokenResponse(user, 200, res);
};

export const getMe = async (req, res, next) => {
    const user = await User.findById(req.user.id).populate('profileId');
    res.status(200).json({ success: true, data: user });
};

