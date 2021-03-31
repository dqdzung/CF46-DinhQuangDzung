const CommentModel = require("./comment");
const PostController = require("../post/post.controller");

const showComment = async ({ postId }) => {
	try {
		const foundPost = await PostController.showPost({ postId });

		const id = foundPost._id;

		const foundComments = await CommentModel.find(id);

		return foundComments;
	} catch (err) {
		console.log(err);
	}
};

const addComment = async ({ content, createdBy, postId }) => {
	const existedPost = await PostModel.findOne({ postId });

	if (!existedPost) throw new Error("Post not found!");

	const newComment = await CommentModel.create({ content, createdBy, postId });

	return newComment;
};

module.exports = { addComment, showComment };
