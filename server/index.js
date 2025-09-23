import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables right at the top
dotenv.config();

// Now import modules that might use those variables
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import userRoutes from './routes/userRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To accept JSON data in the body

// API Routes
app.get('/', (req, res) => {
    res.send('Smart Attendance System API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/schedules', scheduleRoutes);


// Vercel handles the server creation, so we only need to listen locally.
// We check if the environment is NOT production and start the server.
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running for local development on port ${PORT}`));
}

// Export the app for Vercel
export default app;