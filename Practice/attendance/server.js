const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server started at port ${PORT}...`);
});

app.use(express.static("public"));
