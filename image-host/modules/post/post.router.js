const express = require("express");
const Router = new express.Router();
const PostController = require("./post.controller");
const UserModel = require("../auth/user");
const jwt = require("jsonwebtoken");
const { tokenAuth } = require("../../middleware/tokenAuth");

// GET "posts" with pagination
Router.get(
	"/",
	(req, res, next) => {
		// console.log("Middleware here...");
		next();
	},
	async (req, res) => {
		try {
			const { page, pageSize } = req.query;

			const numberPage = Number(page) || 1;
			const numberPageSize = Number(pageSize) || 4;

			const offset = (numberPage - 1) * numberPageSize; // Page starts from 1

			const limit = numberPageSize;

			const [total, data] = await PostController.getPosts({ offset, limit });
			res.send({
				success: 1,
				data: { data, total },
			});
		} catch (err) {
			res.status(500).send({
				success: 0,
				message: err.message,
			});
		}
	}
);

Router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const foundPost = await PostController.getPost(id);

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

Router.post(
	"/",
	// middleware to authorize token
	tokenAuth,
	async (req, res) => {
		try {
			const { imageUrl, title, description } = req.body;

			const createdBy = req.user._id;

			const newPost = await PostController.createPost({
				imageUrl,
				title,
				description,
				createdBy,
			});

			res.send({ success: 1, data: newPost });
		} catch (err) {
			res.status(500).send({
				success: 0,
				message: err.message,
			});
		}
	}
);

module.exports = Router;
