Cách giao tiếp giữa các component:
- Parent -> Child: truyền prop từ trên xuống dưới
- Child -> Parent (để setState cho Parent): Parent truyền prop là 1 function xuống
- Component cùng cấp: tìm parent gần nhất, tạo state giao tiếp cho 2 children và truyền prop xuống
VD: Cha Comp 3 có state a,b => truyền prop c và d cho comp 1 và comp 2, comp 1 gọi func là c do comp 3 truyền xuống => thay đổi state a,b kéo theo thay đổi props truyền xuống cho comp 2.

- Axios: thay cho fetch, ajax => kết quả trả về nằm trong res.data
- Set eventListener window ở componentDidMount, remove eventListener ở componentWillUnmount
- Debounce => sử dụng khi handle các event diễn ra liên tục (vd: onChange của input, scroll của window)