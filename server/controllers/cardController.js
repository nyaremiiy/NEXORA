import Card from '../models/card.js';
import UserWord from '../models/UserWord.js';

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
  const userId = req.user.id;

  try {
    const card = await Card.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!card) {
      return res.status(404).json({ message: 'Картка не знайдена' });
    }

    const remainingCards = await Card.find({ userId });

    if (remainingCards.length === 0) {
      await UserWord.deleteMany({ userId });
    }

    for (const wordObj of card.words) {
      const stillUsed = await Card.findOne({
        userId,
        'words.wordId': wordObj.wordId,
      });

      if (!stillUsed) {
        await UserWord.deleteOne({ _id: wordObj.wordId, userId });
      }
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
    const userId = req.user.id;

    const card = await Card.findOne({
      _id: id,
      userId,
    }).populate('words.wordId');

    if (!card) {
      return res.status(404).json({ message: 'Картку не знайдено' });
    }

    res.json(card);
  } catch (error) {
    console.error('Помилка отримання картки:', error.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
}

export async function removeWordFromCard(req, res) {
  const { cardId, wordId } = req.params;
  const userId = req.user.id;

  try {
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: 'Картку не знайдено' });
    }

    card.words = card.words.filter(
      (w) => w.wordId.toString() !== wordId.toString()
    );

    await card.save();

    const stillUsed = await Card.findOne({
      userId,
      'words.wordId': wordId,
    });

    if (!stillUsed) {
      await UserWord.deleteOne({ _id: wordId, userId });
    }

    res.json({ message: 'Слово видалено з картки' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
}

export async function updateUserWord(req, res) {
  const { en, transcription, ua, progress } = req.body;
  const userId = req.user.id;

  try {
    const updatedWord = await UserWord.findOneAndUpdate(
      { userId, en: en.toLowerCase() },
      { $set: { transcription, ua, progress } },
      { new: true }
    );

    if (!updatedWord) {
      return res.status(404).json({ message: 'Слово не знайдено' });
    }

    res.status(200).json({ message: 'Слово оновлено успішно' });
  } catch (error) {
    console.error('Помилка при оновленні слова:', error.message);
    res.status(500).json({ message: 'Помилка сервера' });
  }
}
