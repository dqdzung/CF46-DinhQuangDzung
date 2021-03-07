const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const QuestionModel = require("./models/question");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(
  "mongodb://localhost:27017/vote-app",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Connected to MongoDB server...");
  }
);

app.get("/ask", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./public/ask/ask.html"));
});

app.get("/", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./public/home/home.html"));
});

app.get("/question/:id", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./public/detail/detail.html"));
});

app.get("/random-question", async (req, res) => {
  try {
    const questions = await QuestionModel.aggregate().sample(1);

    if (!questions[0]) {
      return res.status(404).send({
        success: 0,
        data: null,
      });
    }

    res.send({
      success: 1,
      data: questions[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: 0,
      data: null,
    });
  }
});

app.post("/add-question", async (req, res) => {
  try {
    // console.log(req.body);
    const newQuestion = {
      content: req.body.content,
    };

    console.log(newQuestion);
    const saveQuestion = await QuestionModel.create(newQuestion);

    res.send({
      success: 1,
      data: saveQuestion,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: 0,
      data: null,
    });
  }
});

app.put("/add-vote/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    const foundQuestion = await QuestionModel.findById(id);

    foundQuestion[type]++;
    await foundQuestion.save();

    if (!foundQuestion) {
      return res.status(404).send({
        success: 0,
        data: null,
      });
    }

    res.send({
      success: 1,
      data: foundQuestion,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: 0,
      data: null,
    });
  }
});

app.get("/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const foundQuestion = await QuestionModel.findById(id);

    if (!foundQuestion) {
      return res.status(404).send({
        success: 0,
        data: null,
      });
    }

    return res.send({
      success: 1,
      data: foundQuestion,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: 0,
      data: null,
    });
  }
});

app.listen(8080, (err) => {
  if (err) {
    throw err;
  }
  console.log("Server started...");
});
