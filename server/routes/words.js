import express from 'express';
import { addWord } from '../controllers/wordController.js';

const router = express.Router();

router.post('/add', addWord);

export default router;
