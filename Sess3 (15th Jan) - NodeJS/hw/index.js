const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./data.json").toString());

// // Sử dụng các hàm đọc, ghi file đồng bộ để hoàn thiện các yêu cầu sau
// // lấy thông tin học sinh có _id là jubuq3lfmjjmp0wrdeupt
function getDetailStudent() {
  for (let student of data) {
    if (student._id == "jubuq3lfmjjmp0wrdeupt") {
      return student;
    }
  }  
}

// // Lấy số lượng học sinh có từ Nguyễn
function getCountStudentWithLastName() {
  let count = 0;
  for (let student of data) {
    if (student.name.includes("Nguyễn")) {
      count++;
    }
  }
  return count;
}

// // Tính điểm trung bình của toàn bộ sinh viên (làm tròn đến một chữ số sau dấu phẩy)
function calAverageMark() {
  let total = 0;
  for (let student of data) {
    total += student.mark;
  }
  let average = total / data.length;
  return parseFloat(average.toFixed(1));
}

console.log(calAverageMark())

// // Ghi ra số lượng học sinh đạt điểm 10 ra file output.txt (sử dụng hàm ghi đồng bộ);
function writeCountStudentGet10MarkToFile() {
  let count = 0;
  for (let student of data) {
    if (student.mark == 10) {
      count++;
    }
  }
  fs.writeFileSync('./output.txt', `${count}`);
  return count;
}

module.exports = {
  getDetailStudent,
  getCountStudentWithLastName,
  calAverageMark,
  writeCountStudentGet10MarkToFile
}