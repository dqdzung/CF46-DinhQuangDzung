const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  front: { type: String, required: true },
  back: { type: String, required: true },
});

const cardModel = mongoose.model("flashcard", CardSchema);

module.exports = cardModel;
