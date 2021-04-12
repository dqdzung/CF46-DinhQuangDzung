import { Route } from "react-router-dom";

function PublicRoute({ children, ...props }) {
	return <Route {...props}>{children}</Route>;
}
export default PublicRoute;
