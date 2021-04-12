Backend:

- Cors => client request server khác origin
  Origin: http:/localhost:3000 => http://localhost:8080 => lỗi cors
  -> Sửa trên backend
  -> Dùng npm cors => app.use(cors()) => mở cho tất cả origin
  -> Dựa vào doc để define cụ thể nếu cần

Frontend:

- Custom axios: baseUrl theo biến env (tái sử dụng, tránh hard code)
  create-react-app có sẵn config cho file .env, không cần cài thêm lib, tuy nhiên các biến của file .env phải có prefix là REACT_APP => process.env.[name]

- useEffect
  Chạy sau render (didUpdate)
  Phụ thuộc vào dependency (tham số thứ hai)
