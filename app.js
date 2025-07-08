//MONGODB COMPASS ME ECOMMERCE KE NAAM SE DATA HAI ISKA

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce' }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

// Routes
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/users');

app.use('/users', userRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/cart', cartRoutes);
app.use('/products', productRoutes);

// Redirect root to user login/auth page
app.get('/', (req, res) => {
  res.redirect('/users/auth');
});

// MongoDB connection and server start
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
