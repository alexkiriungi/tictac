import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO).then(
    () => {
        console.log("Database connection successful!");
    }
).catch ((error) => {
    console.log(error)
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});