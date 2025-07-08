const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getAuthPage = (req, res) => {
  res.render('user-auth', { error: '', success: '' });
};

exports.register = async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.render('user-auth', { error: 'All fields are required.', success: '' });
  }
  const existing = await User.findOne({ email });
  if (existing) {
    return res.render('user-auth', { error: 'Email already registered.', success: '' });
  }
  const hash = await bcrypt.hash(password, 10);
  await User.create({ fullname, email, password: hash, cart: [] });
  res.render('user-auth', { error: '', success: 'Account created! Please login.' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.render('user-auth', { error: 'Invalid credentials.', success: '' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.render('user-auth', { error: 'Invalid credentials.', success: '' });
  }
  req.session.userId = user._id;
  res.redirect('/cart'); // Redirect to cart after login
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/users/auth');
  });
};
