const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

const PORT = 3000;

app.use(cors());
app.use(express.json());

// Тестовий роут
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong 🏓' });
});

app.listen(PORT, () => {
  console.log(`Nexora server is running on http://localhost:${PORT}`);
});
