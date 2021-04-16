const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const AuthRouter = require("./modules/auth/auth.router");
const PostRouter = require("./modules/post/post.router");
const CommentRouter = require("./modules/comment/comment.router");

mongoose.connect(
	process.env.MONGODB_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) {
			return console.log("Mongo err", err);
		}

		console.log("MongoDB Server connected...");
	}
);

app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/post", PostRouter);
app.use("/api/comment", CommentRouter);

app.use("*", (req, res) => {
	res.send({ success: 0, message: "404 not found" });
});

app.listen(8080, (err) => {
	if (err) {
		return console.log("Server err", err);
	}
	console.log(`Server started...`);
});
