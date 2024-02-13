import express from 'express';
import { signup, login, test } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/test', test);

export default router;