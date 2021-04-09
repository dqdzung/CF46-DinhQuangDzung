import "./mainLayout.css";
import NavComp from "../Navbar/NavComp";
import { Container } from "react-bootstrap";

export default function MainLayout(props) {
	return (
		<div className="main-layout">
			<NavComp></NavComp>
			<Container>
				<div className="content">{props.children}</div>
			</Container>
		</div>
	);
}
