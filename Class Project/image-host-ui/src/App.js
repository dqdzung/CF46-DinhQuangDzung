import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<div>Home</div>
				</Route>
				<Route path="/login">
					<Login></Login>
				</Route>
				<Route path="/signup">
					<SignUp></SignUp>
				</Route>
				<Route path="/create">
					<div>Create</div>
				</Route>
				<Route path="/posts/:id">
					<div>Detail</div>
				</Route>
				<Route path="*">
					<div>404</div>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
