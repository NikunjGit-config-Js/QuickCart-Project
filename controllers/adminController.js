const Product = require('../models/Product');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

exports.getAdmin = async (req, res) => {
  const products = await Product.find();
  res.render('admin', { products });
};

exports.getLogin = async (req, res) => {
  // Check if any admin exists
  const adminExists = await Admin.exists({});
  res.render('owner-login', { adminExists, error: '' });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && await bcrypt.compare(password, admin.password)) {
    req.session.isAdmin = true;
    res.redirect('/admin');
  } else {
    // Check if any admin exists to show correct form
    const adminExists = await Admin.exists({});
    res.render('owner-login', { adminExists, error: 'Invalid credentials' });
  }
};

exports.register = async (req, res) => {
  // Only allow registration if no admin exists
  const adminExists = await Admin.exists({});
  if (adminExists) {
    return res.render('owner-login', { adminExists: true, error: 'Admin already exists. Please login.' });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.render('owner-login', { adminExists: false, error: 'All fields are required.' });
  }
  const hash = await bcrypt.hash(password, 10);
  await Admin.create({ email, password: hash });
  req.session.isAdmin = true;
  res.redirect('/admin');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
};

exports.deleteProduct = async (req, res) => {
  if (!req.session.isAdmin) return res.status(403).send('Forbidden');
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin');
};
