const UserModel = require("./user");
const bcrypt = require("bcryptjs");

const createUser = async ({ email, password }) => {
	const existedUser = await UserModel.findOne({ email });

	if (existedUser) throw new Error("User already existed!");

	const salt = bcrypt.genSaltSync(10);
	const hashPassword = bcrypt.hashSync(password, salt);

	const newUser = await UserModel.create({ email, password: hashPassword });

	return newUser;
};

const login = async ({ email, password }) => {
	const existedUser = await UserModel.findOne({ email });

	if (!existedUser) throw new Error("User not found!");

	const hashPassword = existedUser.password;

	const comparePassword = bcrypt.compareSync(password, hashPassword);

	if (!comparePassword) throw new Error("Password is wrong!");

	return existedUser;
};

module.exports = { createUser, login };
