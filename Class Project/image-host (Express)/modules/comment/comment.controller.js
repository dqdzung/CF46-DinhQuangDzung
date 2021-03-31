const CommentModel = require("./comment");

const showComment = async ({ postId }) => {
	try {
		const foundComments = await CommentModel.find({ postId });

		return foundComments;
	} catch (err) {
		console.log(err);
	}
};

const addComment = async ({ content, createdBy, postId }) => {
	const newComment = await CommentModel.create({ content, createdBy, postId });

	return newComment;
};

module.exports = { addComment, showComment };
