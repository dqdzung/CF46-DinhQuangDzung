const express = require("express");
const app = express();
const path = require("path");
const port = 6969;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(path.resolve(__dirname, "./public/index.html"));
});

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server started at port ${port}!`);
});
