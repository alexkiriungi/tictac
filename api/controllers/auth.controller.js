import User from '../models/user.model.js';
import bcryptjs from 'bycrptjs';
import { errorHandler } from '../utilis/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (res, req, next) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password || name === '' || username === '' || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required!'));
    }
    const hashPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        name,
        username,
        email,
        password: hashPassword,
    });

    try {
        await newUser.save();
        res.json({ message: "Signed Up successfully"});
    } catch (error) {
        next(error);
    }
}