const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  image: { type: Buffer, required: true },
  bgcolor: { type: String, default: '#fff' },
  panelcolor: { type: String, default: '#fff' },
  textcolor: { type: String, default: '#000' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
