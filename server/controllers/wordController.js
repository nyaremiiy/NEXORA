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

    let globalWord = await Word.findOne({ en });

    if (!globalWord) {
      let response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${en}`
      );

      const phonetics = response.data[0].phonetics || [];
      const transcription =
        phonetics.find((p) => p.text?.includes('oʊ'))?.text ??
        phonetics[0]?.text ??
        '—';

      const ua = wordTranslate
        ? wordTranslate
        : (await translate(en, { from: 'en', to: 'uk' })).text;

      globalWord = await Word.create({ en, transcription, ua });
    }

    let userWord = await UserWord.findOne({ userId, en });

    if (!userWord) {
      userWord = await UserWord.create({
        userId,
        en: globalWord.en,
        ua: globalWord.ua,
        transcription: globalWord.transcription,
        status: 0,
      });
    }

    const card = await Card.findById(cardId);

    const alreadyExists = card.words.some(
      (wordObj) => wordObj.wordId.toString() === userWord._id.toString()
    );

    if (alreadyExists) {
      return res.status(400).json({ message: 'Це слово вже є в картці' });
    }

    card.words.push({ wordId: userWord._id });
    await card.save();

    res.status(201).json({ message: 'success', word: userWord });
  } catch (error) {
    console.error('Помилка:', error.message);
    return res.status(500).json({ message: 'Не вдалося додати слово' });
  }
}
