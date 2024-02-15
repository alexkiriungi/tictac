import express from 'express';
import { verifyToken } from '../utilis/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createAlbum);

export default router;