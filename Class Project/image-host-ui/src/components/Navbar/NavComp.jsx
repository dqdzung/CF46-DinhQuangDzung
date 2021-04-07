import { Navbar, Nav } from "react-bootstrap";

export default function NavComp() {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand href="/">Image-Hosting</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="login">Login</Nav.Link>
					<Nav.Link href="signup">Sign Up</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
