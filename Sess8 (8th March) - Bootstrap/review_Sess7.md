MongoDB sử dụng syntax riêng -> Dùng mongoose: thư viện để đơn giản hóa syntax của MongoDB

80% các tác vụ backend là các thao tác CRUD, map, reduce với DB
- C: Create
create, insertOne, insertMany
- R: Read
find, findOne, findByID => truyền vào các options để filter
- U: Update
findByIdAndUpdate, findOneAndUpdate, updateOne, updateMany => options để lọc
- D: Delete
delete, findByIdAndDelete, findOneAndRemove, deleteOne, deleteMany
- Map/Reduce: array methods, để báo cáo, tính toán mảng
- Aggregate
