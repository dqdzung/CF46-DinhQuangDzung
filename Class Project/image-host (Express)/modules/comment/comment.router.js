const express = require("express");
const Router = new express.Router();
const CommentController = require("./comment.controller");

Router.get("/show-comment/", async (req, res) => {
	try {
		const { postId } = req.body;

		const comments = await CommentController.showComment({ postId });
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

Router.post("/add-comment", async (req, res) => {
	try {
		const { content, createdBy, postId } = req.body;

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
