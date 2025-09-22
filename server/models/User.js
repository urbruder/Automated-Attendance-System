// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false // Do not return password by default
    },
    role: {
        type: String,
        enum: ['student', 'teacher'],
        default: 'student'
    },
    profileId: {
        type: mongoose.Schema.ObjectId,
        refPath: 'role'
    },
        settings: {
        tfaEnabled: {
            type: Boolean,
            default: false
        },
        notifications: {
            email: { type: Boolean, default: true },
            assignments: { type: Boolean, default: true },
            schedule: { type: Boolean, default: false }
        }
    }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', UserSchema);

