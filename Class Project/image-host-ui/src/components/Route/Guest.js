import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../App";
import { useContext } from "react";

function GuestRoute({ children, ...props }) {
	const { user } = useContext(AuthContext);
	return <Route {...props}>{user ? <Redirect to="/" /> : children}</Route>;
}
export default GuestRoute;
