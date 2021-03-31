const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
	{
		content: {
			type: String,
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
		},
		postId: {
			type: mongoose.Types.ObjectId,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("comment", CommentSchema);
