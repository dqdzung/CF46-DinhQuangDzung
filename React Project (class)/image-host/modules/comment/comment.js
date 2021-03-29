const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
    },
    post: {
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", CommentSchema);
