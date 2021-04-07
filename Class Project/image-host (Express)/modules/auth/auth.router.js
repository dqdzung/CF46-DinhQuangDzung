const express = require("express");
const Router = new express.Router();
const AuthController = require("./auth.controller.js");

Router.post("/signup", async (req, res) => {
	try {
		const { email, password } = req.body;

		const newUser = await AuthController.createUser({ email, password });
		res.send({
			success: 1,
			data: newUser,
		});
	} catch (err) {
		res.status(500).send({
			success: 0,
			message: err.message,
		});
	}
});

Router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const foundUser = await AuthController.login({ email, password });
		res.send({
			success: 1,
			data: foundUser,
		});
	} catch (err) {
		res.send({
			success: 0,
			message: err.message,
		});
	}
});

module.exports = Router;
