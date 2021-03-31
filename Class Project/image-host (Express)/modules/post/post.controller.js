const PostModel = require("./post");

const showPost = async ({ postId }) => {
	const foundPost = await PostModel.findOne({ postId });

	if (!foundPost) throw new Error("Post not found!");

	return foundPost;
};

const createPost = async ({ imageUrl, title, description, createdBy }) => {
	const newPost = await PostModel.create({
		imageUrl,
		title,
		description,
		createdBy,
	});

	return newPost;
};

module.exports = { showPost, createPost };
