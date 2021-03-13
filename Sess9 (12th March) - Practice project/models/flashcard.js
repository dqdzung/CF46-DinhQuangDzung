const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  category: { type: String },
  front: { type: String, required: true },
  back: { type: String, required: true },
  remember: {type: Boolean, default: false},
});

const cardModel = mongoose.model("flashcard", CardSchema);

module.exports = cardModel;
