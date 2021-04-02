Phân tích project

- Chức năng
- Model, schema
- Module
  Giao diện cần hiển thị các trường thông tin gì
  Sự liên kết giữa các object => define các id liên kết, 1-1, 1-n, n-n
  Không lưu các trường có thể tính được

Backend
.env => tránh hard code (PORT, MONGODB) => deploy các môi trường khác nhau (cần lib dotenv)

request từ client đến server được xử lý như sau
req
=> router (file tập hợp các đường dẫn có liên quan đến nhau)
=> controller (file xử lý logic)
=> model (CRUD)
