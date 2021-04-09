Backend
Populate của mongoose

- Bản chất là $lookup trong của mongoDB
- Dùng để liên kết các collection trong DB => 1 query ra được thông tin của nhiều collection
  Các bước populate
- Tạo ref trong schema (ref từ các field có sẵn hoặc tạo virtual field)
- Chỉ populate được với find, findOne,...

Frontend
React routing (create-react-app)

- 100% client side, sử dụng JS để thay đổi đường dẫn trên trình duyệt, render lại component
- Library: react-router-dom
- config bằng <Switch>, <Router>, <Route>
  Prop children
  React state hook:
- quản lý state với function component
- syntax: [state, setState] = useState(defaultValue)
- note: setState là func bất đồng bộ
