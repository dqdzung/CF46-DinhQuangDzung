const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		imageUrl: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		createdBy: {
			id: { type: mongoose.Types.ObjectId },
			email: { type: String },
		},
		comments: [],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("post", PostSchema);
