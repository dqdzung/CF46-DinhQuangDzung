const express = require("express");
const app = express();
const path = require("path");
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

app.get("/ask", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/ask/ask.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/home/home.html"));
});

app.get("/search", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/search/search.html"));
});

app.get("/question/:id", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/detail/detail.html"));
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

    const foundQuestion = await QuestionModel.findByIdAndUpdate(
      id,
      { $inc: { [type]: 1 } },
      { new: true }
    );

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

app.delete("/question/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteQuestion = await QuestionModel.findByIdAndDelete(id);

    if (!deleteQuestion) {
      return res.status(400).send({
        success: 0,
        data: null,
      });
    }

    return res.send({
      success: 1,
      data: deleteQuestion,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: 0,
      data: null,
    });
  }
});

app.get("/most-yes", async (req, res) => {
  const foundQuestion = await QuestionModel.find().sort("-yes").limit(1);

  return res.send({
    success: 1,
    data: foundQuestion,
  });
});

app.get("/question-search/:searchInput", async (req, res) => {
  const { searchInput } = req.params;

  const searchTerm = new RegExp(searchInput, "i")

  const results = await QuestionModel.find({content: searchTerm}); 

   res.send({
     success: 1,
    data: results,
  });
});

app.listen(8080, (err) => {
  if (err) {
    throw err;
  }
  console.log("Server started...");
});
