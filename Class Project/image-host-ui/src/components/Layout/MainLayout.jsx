import "./mainLayout.css";
import NavComp from "../Navbar/NavComp";

export default function MainLayout(props) {
	return (
		<div className="main-layout">
			<NavComp></NavComp>
			<div className="content">{props.children}</div>
		</div>
	);
}
