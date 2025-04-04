import express from 'express';
import { addWord } from '../controllers/wordController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/add', verifyToken, addWord);

export default router;
