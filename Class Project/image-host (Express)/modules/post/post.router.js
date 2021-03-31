const express = require("express");
const Router = new express.Router();
const PostController = require("./post.controller");

Router.get("/:id", async (req, res) => {
	try {
		const { postId } = req.params;

		const foundPost = await PostController.showPost({ postId });
		res.send({
			success: 1,
			data: foundPost,
		});
	} catch (err) {
		res.status(500).send({
			success: 0,
			message: err.message,
		});
	}
});

Router.post("/create-post", async (req, res) => {
	try {
		const { imageUrl, title, description, createdBy } = req.body;

		const newPost = await PostController.createPost({
			imageUrl,
			title,
			description,
			createdBy,
		});
		res.send({
			success: 1,
			data: newPost,
		});
	} catch (err) {
		res.status(500).send({
			success: 0,
			message: err.message,
		});
	}
});

module.exports = Router;
