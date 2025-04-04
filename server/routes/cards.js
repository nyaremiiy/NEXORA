import express from 'express';
import {
  createCard,
  getCards,
  deleteCard,
  updateCard,
  getCard
} from '../controllers/cardController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = new express.Router();

router.post('/create', verifyToken, createCard);
router.get('/', verifyToken, getCards);
router.delete('/:id', verifyToken, deleteCard);
router.patch('/:id', verifyToken, updateCard);
router.get('/:id',verifyToken, getCard);

export default router;
