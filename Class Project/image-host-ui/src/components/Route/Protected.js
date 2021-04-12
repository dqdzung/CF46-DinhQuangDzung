import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, user, ...props }) {
	return <Route {...props}>{user ? children : <Redirect to="/login" />}</Route>;
}
export default ProtectedRoute;
