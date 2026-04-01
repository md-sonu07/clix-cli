const mongoose = require('mongoose');

const __MODULE__Schema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('__MODULE__', __MODULE__Schema);
