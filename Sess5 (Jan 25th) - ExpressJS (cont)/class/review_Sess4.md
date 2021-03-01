ExpressJS = framework để code backend cho NodeJS (Ngoài ra có NestJS, SailJS...)
Bản chất của xây dựng server cho web app:
    - Chạy 1 ứng dụng máy tính (thiết bị điện tử có OS)
    - Tạo một service chạy trên 1 port
    - Lắng nghe request từ client

Express cung cấp các router cho các HTML request: 
    - method: GET, POST, PUT, DELETE,...
    - url
    - callback để trả dữ liệu: string, object, json, html, css,...

Express cung cấp static folder:
    - cung cấp 1 cơ chế để xác định file tĩnh (file html, css, image, js...) dễ dàng

Express cung cấp 1 cơ chế để đọc data client gửi lên:
    - express().use(express.urlendcoded({extended: true}));
    - express().use(express.json());

Chức năng web
    - Chức năng tĩnh: hiệu ứng, animation,... không cần lưu kết quả
    - Chức năng động: thao tác với server
    
        1. Xác định khi nào cần request lên server
            + Khi load trang
            + Trong event với DOM, mouse, keyboard
        2. Gọi lên server một HTTP request (vd: fetch)
        3. Code chức năng trên server => đọc thông tin client => trả về thông tin client
        4. Client đọc thông tin trả về và thao tác với DOM để ra kết quả