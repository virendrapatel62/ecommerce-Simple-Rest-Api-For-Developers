const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
});

module.exports = mongoose.model('Product', productSchema);