const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const CardModel = require("./models/flashcard");

const PORT = 6969;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

mongoose.connect(
  "mongodb://localhost:27017/flashcard-web",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Connected to MongoDB server...");
  }
);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/home/home.html"));
});

app.get("/create", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/create/create.html"));
});

app.get("/card/:id", (req, res) => {
  const cardId = req.params.id;

  res.sendFile(path.resolve(__dirname, "./public/detail/detail.html"));
});

app.get("/detail/:id", async (req, res) => {
  try {
    const cardId = req.params.id;
    const foundCard = await CardModel.findById(cardId);

    if (!foundCard) {
      return res
        .status(404)
        .send({ success: 0, data: null, message: "Not found" });
    }

    res.send({ success: 1, data: foundCard });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: 0,
      data: null,
    });
  }
});

app.get("/random-card", async (req, res) => {
  try {
    const cards = await CardModel.aggregate().sample(1);

    if (!cards[0]) {
      return res.status(404).send({ success: 0, data: null });
    }

    res.send({ success: 1, data: cards[0] });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: 0,
      data: null,
    });
  }
});

app.post("/new-card", async (req, res) => {
  try {
    const newCard = req.body;

    console.log(newCard);

    const saveCard = await CardModel.create(newCard);

    res.send({ success: 1, data: saveCard });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: 0,
      data: null,
    });
  }
});

app.put("/edit/:id", async (req, res) => {
  try {
    const cardId = req.params.id;

    const { category, front, back, remember } = req.body;
    
    const saveCard = await CardModel.findByIdAndUpdate(
      cardId,
      {
        category: category,
        front: front,
        back: back,
        remember: remember,
      },
      { new: true }
    );

    res.send({ success: 1, data: saveCard });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: 0,
      data: null,
    });
  }
});

app.put("/remember-card/:id", async (req, res) => {
  try {
    const cardId = req.params.id;

    const card = await CardModel.findByIdAndUpdate(
      cardId,
      { remember: true },
      { new: true }
    );

    if (!card) {
      return res.status(404).send({ success: 0, data: null });
    }

    res.send({ success: 1, data: card });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: 0,
      data: null,
    });
  }
});

app.put("/forget-card/:id", async (req, res) => {
  try {
    const cardId = req.params.id;

    const card = await CardModel.findByIdAndUpdate(
      cardId,
      { remember: false },
      { new: true }
    );

    if (!card) {
      return res.status(404).send({ success: 0, data: null });
    }

    res.send({ success: 1, data: card });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: 0,
      data: null,
    });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server started at port ${PORT}...`);
});
