Mô hình chạy web => Client - Server
- Client (Web Browser): HTML, CSS, Javascript
- Server: Java, C#, PHP, NodeJS...
- Để giao tiếp client - server cần sử dụng HTTP request

NodeJS là môi trường chạy JS ngoài trình duyệt
Npm là Node package manager
- Syntax:
    + Để tạo môi trường node: npm init
    + Để export function(s): module.exports = {}
    + Để sử dụng function đã được export (từ file js khác, từ libary, của nodejs): require("filename")

note: có thể dùng require cho file JSON thay vì fs.readFile

Most popular backend framework for NodeJS: ExpressJS, SailJS, KoaJS, NestJS