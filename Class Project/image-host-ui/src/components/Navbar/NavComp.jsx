import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import { useContext } from "react";

export default function NavComp() {
	const { user } = useContext(AuthContext);
	console.log(user);

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand href="/">Image-Hosting</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Item className="mx-2">
							<Link to="login">Login</Link>
						</Nav.Item>
						<Nav.Item className="mx-2">
							<Link to="signup">Sign Up</Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
