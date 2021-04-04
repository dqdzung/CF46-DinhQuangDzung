const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
	{
		content: {
			type: String,
		},
		createdBy: {
			id: { type: mongoose.Types.ObjectId },
			email: { type: String },
		},
		postId: {
			type: mongoose.Types.ObjectId,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("comment", CommentSchema);
