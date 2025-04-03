import Card from '../models/card.js';

export async function createCard(req, res) {
  const { title } = req.body;

  try {
    const userId = req.user.id;

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
}

export async function getCards(req, res) {
  try {
    const userId = req.user.id;

    const cards = await Card.find({ userId });

    res.status(200).json(cards);
  } catch (error) {
    console.error('Error getting cards:', error);
    res.status(500).json({ message: 'Не вдалося отримати картки.' });
  }
}
