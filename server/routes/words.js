import express from 'express';
import { addWord, getUserWords } from '../controllers/wordController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/add', verifyToken, addWord);
router.get('/', verifyToken, getUserWords);

export default router;
