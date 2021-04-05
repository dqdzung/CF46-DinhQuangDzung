const PostModel = require("./post");
const CommentController = require("../comment/comment.controller");

const getPosts = async ({ offset, limit }) => {
	// const posts = await PostModel.find().skip(offset).limit(limit);

	// e.g. offset 1, limit 10 => 1 - 10
	//      offset 20, limit 6 => 20 - 25
	// => offset is the starting point

	// const total = await PostModel.countDocuments();

	// Promise.all(array) for unrelated promises
	const [posts, total] = await Promise.all([
		PostModel.find()
			.skip(offset)
			.limit(limit)
			.select("-__v")
			.populate({ path: "createdBy", select: "-password" }),
		PostModel.countDocuments(),
	]);

	return [total, posts];
};

const getPost = async (postId) => {
	const foundPost = await PostModel.findById(postId)
		.populate("createdBy", "email")
		.populate({
			path: "comments",
			populate: {
				path: "createdBy",
			},
		});

	if (!foundPost) throw new Error("Post not found!");

	const comments = await CommentController.getComment(postId);

	foundPost.comments = comments;

	console.log(foundPost);

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

module.exports = { getPost, getPosts, createPost };
