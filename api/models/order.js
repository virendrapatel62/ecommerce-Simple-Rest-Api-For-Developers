const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    price: { type: Number, require: true },
    quantity: { type: Number, default: 1 },
    status: {
        type: mongoose.Schema.Types.String,
        default: 'pending'
    }
});

module.exports = mongoose.model('Order', orderSchema);