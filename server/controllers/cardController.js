import Card from '../models/card.js';
import jwt from 'jsonwebtoken';

export const createCard = async (req, res) => {
  const { title } = req.body;

  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const newCard = await Card.create({
      title,
      userId,
    });

    res.status(201).json({
      message: 'Картка створена успішно',
      success: true,
      wordsCount: newCard.words.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Сталася помилка на сервері.' });
  }
};
