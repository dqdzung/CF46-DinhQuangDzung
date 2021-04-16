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
			type: mongoose.Types.ObjectId,
			ref: "user",
		},
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PostSchema.virtual("comments", {
	ref: "comment", //model to use
	localField: "_id",
	foreignField: "post",
});

module.exports = mongoose.model("post", PostSchema);
