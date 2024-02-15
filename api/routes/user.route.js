import express from 'express';
import { verifyToken } from '../utilis/verifyUser.js';
import { signout, updateUser, getUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.put('/update/:userId', verifyToken, updateUser);
router.post('/signout', signout);
router.get('/getusers', verifyToken, getUsers);

export default router;
