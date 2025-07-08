const Product = require('../models/Product');
const fs = require('fs');

exports.getShop = async (req, res) => {
  const products = await Product.find();
  res.render('shop', { products });
};

exports.getIndex = async (req, res) => {
  res.redirect('/users/auth'); // Always redirect to user auth page
};

exports.getCart = (req, res) => {
  res.render('cart');
};
