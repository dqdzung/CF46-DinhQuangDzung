const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const CardModel = require("./models/flashcard");

const PORT = 5000;

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

app.get("/create-card", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/create/create.html"));
});

app.post("/new-card", async (req, res) => {
  const { front, back } = req.body;

  // console.log(newCard);

  const newCard = { front: front, back: back };

  const saveCard = await CardModel.create(newCard);

  res.status(200).send({
    success: 1,
    data: saveCard,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server started at port ${PORT}...`);
});
