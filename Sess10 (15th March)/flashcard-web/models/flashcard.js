const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["code", "vocal", "other"],
    default: "other",
  },
  isRemembered: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("card", schema);
