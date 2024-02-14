import express from 'express';
import { verifyToken } from '../utilis/verifyUser.js';
import { updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.put('/update/userId', verifyToken, updateUser);