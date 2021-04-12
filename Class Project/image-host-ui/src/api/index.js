import axios from "axios";

const customAxios = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
});

// Trước khi request được gọi lên server, nó phải chạy vào đây trước
customAxios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = token;
		}
		return config;
	},
	function (err) {
		return Promise.reject(err);
	}
);

export default customAxios;
