const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const AuthRouter = require("./modules/auth/auth.router");
const PostRouter = require("./modules/post/post.router");
const CommentRouter = require("./modules/comment/comment.router");

mongoose.connect(
	"mongodb://localhost:27017/image-host",
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
