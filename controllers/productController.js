const Product = require('../models/Product');
const fs = require('fs');
const Admin = require('../models/Admin');

exports.getCreateProduct = async (req, res) => {
  // Only allow if logged in as admin
  if (!req.session.isAdmin) return res.redirect('/admin/login');
  // Only allow if there is exactly one admin
  const adminCount = await Admin.countDocuments();
  if (adminCount !== 1) return res.send('Product creation only allowed for the single admin.');
  res.render('createproducts', { success: null });
};

exports.postCreateProduct = async (req, res) => {
  if (!req.session.isAdmin) return res.redirect('/admin/login');
  const adminCount = await Admin.countDocuments();
  if (adminCount !== 1) return res.send('Product creation only allowed for the single admin.');
  const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
  const image = req.file ? fs.readFileSync(req.file.path) : null;
  if (!image) return res.render('createproducts', { success: 'Image required!' });
  await Product.create({ name, price, discount, bgcolor, panelcolor, textcolor, image });
  res.redirect('/admin'); // Redirect to admin page after product creation
};
