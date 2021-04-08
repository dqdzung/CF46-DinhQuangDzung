import AuthLayout from "../../components/Layout/AuthLayout";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passConfirm, setPassConfirm] = useState("");
	const [message, setMessage] = useState("");

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePassChange = (e) => {
		setPassword(e.target.value);
	};

	const handlePassConfirm = (e) => {
		setPassConfirm(e.target.value);
	};

	let isMatched;
	const validate = (password, passwordConfirm) => {
		password === passwordConfirm ? (isMatched = true) : (isMatched = false);
		if (!isMatched) {
			setMessage("Password doesn't match!");
		} else {
			setMessage("");
		}
		return isMatched;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isMatched) {
			const res = await axios({
				url: "http://localhost:8080/api/auth/signup",
				method: "POST",
				data: {
					email,
					password,
				},
			});
			if (res.data.success) {
				alert("Sign up successfully!!!");
				clearInput();
			}
		}
	};

	const clearInput = () => {
		setEmail("");
		setPassword("");
		setPassConfirm("");
	};

	return (
		<AuthLayout>
			<div className="form-wrapper">
				<h3 className="text-center">Sign Up</h3>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={handleEmailChange}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							value={password}
							onChange={handlePassChange}
							onKeyUp={() => {
								validate(password, passConfirm);
							}}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password Confirmation</Form.Label>
						<Form.Control
							type="password"
							placeholder="Re-enter password"
							value={passConfirm}
							onChange={handlePassConfirm}
							onKeyUp={() => {
								validate(password, passConfirm);
							}}
						/>
					</Form.Group>
					<span style={{ color: "red" }}>{message}</span>
					<Button className="mt-4" variant="success" type="submit" block>
						Sign Up
					</Button>
				</Form>
			</div>
		</AuthLayout>
	);
};

export default SignUp;
