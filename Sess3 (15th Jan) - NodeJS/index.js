// const isOdd = require("is-odd");
const fs = require("fs");

// console.log("Hello world");
// console.log("5 is odd:", isOdd(5));

// fs.writeFile("text.txt", "Hi there", (err) => {
//     if (err) {
//         return console.log("Error",err);
//     }
//     console.log("File written!");
// })

// console.log("hihi");

// fs.readFile("./text.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log("File read:", data);
// });

// const textContent = fs.readFileSync("./text.txt").toString();
// console.log("Text content:", textContent);

// Ex:
const numberData = fs.readFileSync("./number.txt").toString();
const numberArr = numberData.split(" ");
const oddArr = [];
for (let number of numberArr) {
  if (parseInt(number) % 2 != 0) {
    oddArr.push(number);
  }
}
const oddStr = oddArr.toString();

fs.writeFile("output.txt", oddStr, (err) => {
  if (err) {
    return console.log("Error", err);
  }
  console.log("File written!");
  fs.readFile("./output.txt", (err, data) => {
    if (err) throw err;
    console.log("File read:", data.toString());
  });
});
