const jwt = require("jsonwebtoken");
const UserModel = require("../modules/auth/user");

const tokenAuth = async (req, res, next) => {
	const token = req.headers.authorization;
	try {
		if (!token) throw new Error("Empty token");

		const decodeData = jwt.verify(token, "CF46");

		const { userId } = decodeData;
		const existedUser = await UserModel.findById(userId).select(
			"-password -__v"
		);

		if (!existedUser) throw new Error("User not existed!");

		req.user = existedUser; // Gán req.user - giao tiếp giữa các middleware

		next();

		// gán thêm dữ liệu cho req
	} catch (err) {
		res.status(401).send({
			success: 0,
			message: err.message,
		});
	}
};

module.exports = { tokenAuth };
