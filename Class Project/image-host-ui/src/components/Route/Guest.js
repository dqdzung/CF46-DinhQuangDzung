import { Route, Redirect } from "react-router-dom";

function GuestRoute({ children, user, ...props }) {
	return <Route {...props}>{user ? <Redirect to="/" /> : children}</Route>;
}
export default GuestRoute;
