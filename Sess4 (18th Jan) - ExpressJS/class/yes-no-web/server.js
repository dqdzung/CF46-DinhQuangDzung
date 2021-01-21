const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

app.get("/ask", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./public/ask/index.html"));
});

app.get("/", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./public/home/index.html"));  
});

app.get("/data.json", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./data.json"));  
});

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
  console.log("Server started!");
});
