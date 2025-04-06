import express from 'express';
import {
  createCard,
  getCards,
  deleteCard,
  updateCard,
  getCard,
  removeWordFromCard,
  updateUserWord,
} from '../controllers/cardController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = new express.Router();

router.post('/create', verifyToken, createCard);
router.get('/', verifyToken, getCards);
router.patch('/edit-word', verifyToken, updateUserWord);
router.patch('/:id', verifyToken, updateCard);
router.delete('/:cardId/words/:wordId', verifyToken, removeWordFromCard);
router.delete('/:id', verifyToken, deleteCard);
router.get('/:id', verifyToken, getCard);

export default router;
