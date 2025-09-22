// // index.js
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db.js';

// // Import routes
// import authRoutes from './routes/authRoutes.js';
// import studentRoutes from './routes/studentRoutes.js';
// import attendanceRoutes from './routes/attendanceRoutes.js';

// // Load environment variables
// dotenv.config();

// // Initialize Express app
// const app = express();

// // Connect to Database
// connectDB();

// // Middleware
// app.use(cors()); // Enable Cross-Origin Resource Sharing
// app.use(express.json()); // To accept JSON data in the body

// // API Routes
// app.get('/', (req, res) => {
//     res.send('Smart Attendance System API is running...');
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/students', studentRoutes);
// app.use('/api/attendance', attendanceRoutes);

// // Define the port
// const PORT = process.env.PORT || 5000;

// // Start the server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



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

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

