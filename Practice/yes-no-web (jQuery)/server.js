const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/ask", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./public/ask/ask.html"));
});

app.get("/", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./public/home/home.html"));
});

app.get("/question/:id", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./public/detail/detail.html"));
});

app.get("/random-question", (request, response) => {
  const data = require("./data.json");
  const randomQuestion = randomize(data);
  response.send({
    success: 1,
    data: randomQuestion,
  });
});

const randomize = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

app.post("/add-question", (request, response) => {
  const data = require("./data.json");
  const question = {
    _id: data.length + 1,
    content: request.body.content,
    yes: 0,
    no: 0,
  };
  const newData = [...data, question];
  fs.writeFileSync("data.json", JSON.stringify(newData));

  response.send({
    success: 1,
    data: question,
  });
});

app.listen(8080, (err) => {
  if (err) {
    throw err;
  }
  console.log("Server started...");
});

app.put("/add-vote/:id", (req, res) => {
  const id = req.params.id;
  const type = req.body.type;
  let data = JSON.parse(fs.readFileSync("data.json"));

  const foundQuestion = data.find(
    (question) => parseInt(question._id) === parseInt(id)
  );

  if (type === "yes" || type === "no") {
    foundQuestion[type]++;
  }

  fs.writeFileSync("data.json", JSON.stringify(data));

  return res.send({
    success: 1,
    data: foundQuestion,
  });
});

app.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  let data = JSON.parse(fs.readFileSync("data.json"));
  const foundQuestion = data.find(
    (question) => parseInt(question._id) === parseInt(id)
  );
  return res.send({ success: 1, data: foundQuestion });
});
