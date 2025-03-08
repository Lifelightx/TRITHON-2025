import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
//import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
//app.use('/api/users', userRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
