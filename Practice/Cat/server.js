const express = require("express");
const path = require("path");
const app = express();
const PORT = 8888;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/html/home.html"));
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server started at port ${PORT}...`);
});
