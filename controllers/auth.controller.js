const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const AuthCo = {};

AuthCo.register = async function (req, res) {
  try {
    const { email, password } = req.body;
    const isExisting = await User.findOne({ email });
    if (isExisting) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { ...req.body, password: hashedPassword };
    const user = await User.create(userData);
    const createdUser = user.toObject();
    delete createdUser.password;
    res
      .status(201)
      .json({ message: 'Successfully registered', user: createdUser });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

AuthCo.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing password or email' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isUser = await bcrypt.compare(password, user.password);
    if (!isUser) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const userData = {
      id: user._id,
      email: user.email,
    };
    const accessToken = jwt.sign(userData, process.env.JWT_TOKEN, {
      expiresIn: '2h',
    });
    res.status(200).json({ accessToken });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = AuthCo;
