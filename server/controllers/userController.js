import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Користувача не знайдено!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Невірний пароль!' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(200).json({
      message: 'Авторизація успішна!',
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Виникла помилка авторизації!', error: err.message });
  }
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: 'Користувач вже існує!',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'Користувач успішно зареєстрований',
      success: true,
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Виникла помилка реєстрації!', error: err.message });
  }
};
