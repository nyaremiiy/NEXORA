import express from 'express';
import { createCard } from '../controllers/cardController.js';

const router = new express.Router();

router.post('/created-card', createCard);

export default router;
