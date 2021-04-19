import axios from "axios";

const customAxios = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
});

// Trước khi request được gọi lên server, nó phải chạy vào đây trước
customAxios.interceptors.request.use(
	(req) => {
		const token = localStorage.getItem("token");
		if (token) {
			req.headers.Authorization = token;
		}
		return req;
	},
	function (err) {
		return Promise.reject(err);
	}
);

export default customAxios;
