const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
	{
		content: {
			type: String,
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "user",
		},
		postId: {
			type: mongoose.Types.ObjectId,
			ref: "post",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("comment", CommentSchema);
