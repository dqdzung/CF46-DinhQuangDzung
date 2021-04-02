const CommentModel = require("./comment");
const PostModel = require("../post/post");

const getComment = async ({ postId }) => {
	try {
		const foundComments = await CommentModel.find({ postId });

		return foundComments;
	} catch (err) {
		console.log(err);
	}
};

const addComment = async ({ content, createdBy, postId }) => {
	const existedPost = await PostModel.findById(postId);

	if (!existedPost) throw new Error("Post not found!");

	const newComment = await CommentModel.create({ content, createdBy, postId });

	return newComment;
};

module.exports = { addComment, getComment };
