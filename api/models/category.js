const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: mongoose.Schema.Types.String, required: true },

});

module.exports = mongoose.model('Category', categorySchema);