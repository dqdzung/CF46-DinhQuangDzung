import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../App";
import { useContext } from "react";

export default function NavComp() {
	const { user, setUser } = useContext(AuthContext);

	const history = useHistory();

	const handleLogout = () => {
		const logOutConfirm = window.confirm("Are you sure?");

		if (logOutConfirm) {
			localStorage.removeItem("token");
			setUser(null);
			// history.push("/login");
		}
	};

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand href="/">Image-Hosting</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					{!user ? (
						<Nav className="mr-auto">
							<Nav.Item className="mx-2">
								<Link to="/login">Login</Link>
							</Nav.Item>
							<Nav.Item className="mx-2">
								<Link to="/signup">Sign Up</Link>
							</Nav.Item>
						</Nav>
					) : (
						<Nav className="ml-auto">
							<Navbar.Text>Welcome,</Navbar.Text>
							<NavDropdown title={user.email} id="basic-nav-dropdown">
								<NavDropdown.Item>Upload</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item onClick={handleLogout}>
									Logout
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
