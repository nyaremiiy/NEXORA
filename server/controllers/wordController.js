import axios from 'axios';
import { translate } from '@vitalets/google-translate-api';
import Word from '../models/word.js';
import Card from '../models/card.js';
import UserWord from '../models/UserWord.js';

export async function addWord(req, res) {
  const { cardId, word, wordTranslate } = req.body;
  const userId = req.user.id;

  try {
    const en = word.toLowerCase();
    let transcription = '—';
    let ua = '';

    let globalWord = await Word.findOne({ en });

    if (!globalWord) {
      try {
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${en}`
        );

        if (Array.isArray(response.data)) {
          const phonetics = response.data[0].phonetics || [];
          transcription =
            phonetics.find((p) => p.text?.includes('oʊ'))?.text ??
            phonetics[0]?.text ??
            '—';
        }
      } catch (err) {
        console.warn(`Не вдалося отримати транскрипцію для "${en}":`, err.message);
      }

      if (!wordTranslate) {
        const response = await translate(en, { from: 'en', to: 'uk' });
        ua = response.text;
      } else {
        ua = wordTranslate;
      }

      globalWord = await Word.create({ en, transcription, ua });
    } else {
      transcription = globalWord.transcription;
      ua = wordTranslate || globalWord.ua;
    }

    let userWord = await UserWord.findOne({ userId, en });

    if (!userWord) {
      userWord = await UserWord.create({
        userId,
        en,
        ua,
        transcription,
        status: 0,
      });
    }

    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: 'Картку не знайдено' });
    }

    const alreadyExists = card.words.some(
      (wordObj) => wordObj.wordId.toString() === userWord._id.toString()
    );

    if (alreadyExists) {
      return res.status(400).json({ message: 'Це слово вже є в картці' });
    }

    card.words.push({ wordId: userWord._id });
    await card.save();

    return res.status(201).json({ message: 'Слово додано', word: userWord });
  } catch (error) {
    console.error('Помилка при додаванні слова:', error.message);
    return res.status(500).json({ message: 'Не вдалося додати слово.' });
  }
}


export async function getUserWords(req, res) {
  const userId = req.user.id;

  try {
    const userWords = await UserWord.find({ userId });

    return res.status(200).json({ message: 'success', words: userWords });
  } catch (error) {
    console.error('Помилка:', error.message);
    return res.status(500).json({ message: 'Не вдалося отримати слова.' });
  }
}
