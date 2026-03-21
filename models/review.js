const mongoose = require('mongoose');
const Schema = mongoose.Schema; // ✅ correct way

const reviewSchema = new Schema({
    comment: String,   // ⚠️ use lowercase (best practice)
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now   // ⚠️ no brackets
    }
});

module.exports = mongoose.model('Review', reviewSchema);