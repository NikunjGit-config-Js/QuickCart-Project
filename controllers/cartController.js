const Product = require('../models/Product');
const User = require('../models/User');

// Show cart page with all products and user's cart, including discount calculation
exports.getCart = async (req, res) => {
  if (!req.session.userId) return res.redirect('/users/auth');
  const user = await User.findById(req.session.userId).populate('cart.product');
  const products = await Product.find();

  // Calculate totals
  let total = 0;
  let totalDiscount = 0;
  let finalTotal = 0;
  if (user && user.cart.length > 0) {
    user.cart.forEach(item => {
      const price = item.product.price * item.quantity;
      const discount = item.product.discount ? (item.product.discount * item.quantity) : 0;
      total += price;
      totalDiscount += discount;
    });
    finalTotal = total - totalDiscount;
  }

  res.render('cart', { user, products, total, totalDiscount, finalTotal });
};

// Add product to cart
exports.addToCart = async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  const user = await User.findById(req.session.userId);
  const { productId } = req.body;
  const cartItem = user.cart.find(item => item.product.toString() === productId);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    user.cart.push({ product: productId, quantity: 1 });
  }
  await user.save();
  res.json({ success: true });
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not logged in' });
  const user = await User.findById(req.session.userId);
  const { productId } = req.body;
  const cartItem = user.cart.find(item => item.product.toString() === productId);
  if (cartItem) {
    cartItem.quantity -= 1;
    if (cartItem.quantity <= 0) {
      user.cart = user.cart.filter(item => item.product.toString() !== productId);
    }
    await user.save();
  }
  res.json({ success: true });
};

// Checkout page with discount calculation
exports.getCheckout = async (req, res) => {
  if (!req.session.userId) return res.redirect('/users/auth');
  const user = await User.findById(req.session.userId).populate('cart.product');

  // Calculate totals
  let total = 0;
  let totalDiscount = 0;
  let finalTotal = 0;
  if (user && user.cart.length > 0) {
    user.cart.forEach(item => {
      const price = item.product.price * item.quantity;
      const discount = item.product.discount ? (item.product.discount * item.quantity) : 0;
      total += price;
      totalDiscount += discount;
    });
    finalTotal = total - totalDiscount;
  }

  res.render('checkout', { user, orderPlaced: false, total, totalDiscount, finalTotal });
};

// Place order (dummy, just clears cart)
exports.postCheckout = async (req, res) => {
  if (!req.session.userId) return res.redirect('/users/auth');
  const user = await User.findById(req.session.userId).populate('cart.product');
  // Calculate totals for order summary
  let total = 0;
  let totalDiscount = 0;
  let finalTotal = 0;
  if (user && user.cart.length > 0) {
    user.cart.forEach(item => {
      const price = item.product.price * item.quantity;
      const discount = item.product.discount ? (item.product.discount * item.quantity) : 0;
      total += price;
      totalDiscount += discount;
    });
    finalTotal = total - totalDiscount;
  }
  user.cart = [];
  await user.save();
  res.render('checkout', { user, orderPlaced: true, total, totalDiscount, finalTotal });
};
