import "./authLayout.css";
import MainLayout from "./MainLayout";

export default function AuthLayout(props) {
	return (
		<MainLayout>
			<div className="auth-layout">{props.children}</div>
		</MainLayout>
	);
}
