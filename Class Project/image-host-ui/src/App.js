import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import MainLayout from "./components/Layout/MainLayout";

function App() {
	return (
		<Router>
			<MainLayout>
				<Switch>
					<Route path="/" exact>
						<Home></Home>
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
			</MainLayout>
		</Router>
	);
}

export default App;
