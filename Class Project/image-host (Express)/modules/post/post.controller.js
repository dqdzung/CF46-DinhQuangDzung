const PostModel = require("./post");

const getPosts = async ({ offset, limit }) => {
	// const posts = await PostModel.find().skip(offset).limit(limit);

	// e.g. offset 1, limit 10 => 1 - 10
	//      offset 20, limit 6 => 20 - 25
	// => offset is the starting point

	// const total = await PostModel.countDocuments();

	// Promise.all(array) for unrelated promises
	const [posts, total] = await Promise.all([
		PostModel.find().skip(offset).limit(limit),
		PostModel.countDocuments(),
	]);

	return [total, posts];
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

module.exports = { getPosts, createPost };
