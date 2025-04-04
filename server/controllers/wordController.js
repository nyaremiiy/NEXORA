import axios from 'axios';
import { translate } from '@vitalets/google-translate-api';
import Word from '../models/word.js';
import Card from '../models/card.js';

export async function addWord(req, res) {
  const { cardId, word, wordTranslate } = req.body;

  try {
    let newWord = await Word.findOne({ en: word });

    if (!newWord) {
      let response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      const phonetics = response.data[0].phonetics || [];
      const transcription =
        phonetics.find((p) => p.text?.includes('oʊ'))?.text ?? // американська
        phonetics[0]?.text;

      let ua = '';

      if (!wordTranslate) {
        response = await translate(word, { from: 'en', to: 'uk' });
        ua = response.text;
      } else {
        ua = wordTranslate;
      }

      newWord = await Word.create({ en: word, transcription, ua });
    }

    const card = await Card.findById(cardId);

    const alreadyExists = card.words.some(
      (wordObj) => wordObj.wordId.toString() === newWord._id.toString()
    );

    if (alreadyExists) {
      return res.status(400).json({ message: 'Це слово вже є в картці' });
    }

    card.words.push({ wordId: newWord._id });
    await card.save();

    res.status(201).json({ message: 'success', word: newWord });
  } catch (error) {
    console.error('Помилка:', error.message);
    return res.status(500).json({ message: 'Не вдалося додати слово' });
  }
}

// const card = await Card.findById(cardId).populate('words.wordId');
// return card.words
