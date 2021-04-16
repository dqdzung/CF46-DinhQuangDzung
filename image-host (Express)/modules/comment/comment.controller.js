const CommentModel = require("./comment");
const PostModel = require("../post/post");

const getComment = async (postId) => {
	const foundComments = await CommentModel.find({ post: postId })
		.populate("createdBy", "email")
		.populate("postId", "title");

	if (!foundComments) throw new Error("No Comments");

	return foundComments;
};

const addComment = async ({ content, createdBy, post }) => {
	const existedPost = await PostModel.findById(post);

	if (!existedPost) throw new Error("Post not found!");

	const newComment = await CommentModel.create({ content, createdBy, post });

	return newComment;
};

module.exports = { addComment, getComment };
