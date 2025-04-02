import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './services/db.js';

// import axios from 'axios';

// const word = 'word';

// const options = {
//   method: 'GET',
//   url: `https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${word}`,
//   headers: {
//     'X-RapidAPI-Key': 'f89426f6a2msh203d2d283507cb8p1a12c0jsn1c48c5da5db9',
//     'X-RapidAPI-Host': 'lingua-robot.p.rapidapi.com'
//   }
// };

// try {
//   const response = await axios.request(options);
//   console.log('🔠 Транскрипція:', response.data.entries[0].pronunciations[0].transcriptions[0].transcription);
// } catch (error) {
//   console.error('❌ Помилка:', error.response?.data || error.message);
// }

// Worked

// import { translate } from '@vitalets/google-translate-api';

// async function run() {
//   const res = await translate('', { from: 'en', to: 'uk' });
//   console.log('Переклад:', res.text);
// }

// run();

import userRoutes from './routes/users.js';
import cardRoutes from './routes/cards.js';

import protectedRoutes from './routes/protectedRoutes.js';

connectDB();

const app = express();

dotenv.config();

const PORT = 8888;

app.use(cors());
app.use(express.json());

app.use('/api', protectedRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cards', cardRoutes);

app.listen(PORT, () => {
  console.log(`✅ Nexora server is running on http://localhost:${PORT}`);
});
