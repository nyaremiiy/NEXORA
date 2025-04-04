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

export async function deleteCard(req, res) {
  const { id } = req.params;

  try {
    const card = await Card.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!card) {
      return res.status(404).json({ message: 'Картка не знайдена' });
    }

    res.status(200).json({ message: 'Картку успішно видалено' });
  } catch (error) {
    console.error('Помилка видалення картки:', error);
    res.status(500).json({ message: 'Не вдалося видалити картку' });
  }
}

export async function updateCard(req, res) {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const card = await Card.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title },
      { new: true }
    );

    if (!card) return res.status(404).json({ message: 'Картка не знайдена' });

    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка оновлення картки' });
  }
}

export async function getCard(req, res) {
  try {
    const { id } = req.params;

    const card = await Card.findById(id).populate('words.wordId');

    if (!card) {
      return res.status(404).json({ message: 'Картку не знайдено' });
    }

    res.json(card);
  } catch (error) {
    console.error('Помилка отримання картки:', error.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
}