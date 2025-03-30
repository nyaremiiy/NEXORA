import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './services/db.js';

import userRoutes from './routes/users.js';

connectDB();

const app = express();

dotenv.config();
 
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Тестовий роут
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong 🏓' });
});


app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`✅ Nexora server is running on http://localhost:${PORT}`);
});
