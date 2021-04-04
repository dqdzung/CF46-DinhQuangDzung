const express = require("express");
const Router = new express.Router();
const CommentController = require("./comment.controller");
const { tokenAuth } = require("../../middleware/tokenAuth");

Router.get("/:postId", async (req, res) => {
	try {
		const { postId } = req.params;

		const comments = await CommentController.getComment({ postId });
		res.send({
			success: 1,
			data: comments,
		});
	} catch (err) {
		res.status(500).send({
			success: 0,
			message: err.message,
		});
	}
});

Router.post("/", tokenAuth, async (req, res) => {
	try {
		const { content, postId } = req.body;

		const createdBy = {
			id: req.user._id,
			email: req.user.email,
		};

		const newComment = await CommentController.addComment({
			content,
			createdBy,
			postId,
		});
		res.send({
			success: 1,
			data: newComment,
		});
	} catch (err) {
		res.status(500).send({
			success: 0,
			message: err.message,
		});
	}
});

module.exports = Router;
