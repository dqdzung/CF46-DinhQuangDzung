import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import MainLayout from "./components/Layout/MainLayout";
import Loading from "./components/Loading/Loading";
import PublicRoute from "./components/Route/Public";
import GuestRoute from "./components/Route/Guest";
import ProtectedRoute from "./components/Route/Protected";

import { useState, useEffect, createContext } from "react";
import client from "./api";

export const AuthContext = createContext();

function App() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchUserInfo = async () => {
		const token = localStorage.getItem("token");

		if (!token) {
			setLoading(false);
			return;
		}

		try {
			const res = await client({
				url: "/api/auth/user",
				method: "GET",
			});

			if (res.data.success) {
				setUser(res.data.data);
				setLoading(false);
			} else {
				setLoading(false);
			}
		} catch (err) {
			setLoading(false);
			console.log(err);
		}
	};

	useEffect(() => {
		fetchUserInfo();
	}, []);

	if (loading) return <Loading></Loading>;

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			<Router>
				<MainLayout>
					<Switch>
						<PublicRoute path="/" exact>
							<Home></Home>
						</PublicRoute>
						<GuestRoute path="/login">
							<Login></Login>
						</GuestRoute>
						<GuestRoute path="/signup">
							<SignUp></SignUp>
						</GuestRoute>
						<ProtectedRoute path="/create">
							<Create></Create>
						</ProtectedRoute>
						<PublicRoute path="/post/:id">
							<Detail></Detail>
						</PublicRoute>
						<Route path="*">
							<div>404</div>
						</Route>
					</Switch>
				</MainLayout>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
