import express from 'express';
import { createCard, getCards } from '../controllers/cardController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = new express.Router();

router.post('/create', verifyToken, createCard);
router.get('/', verifyToken, getCards);

export default router;
