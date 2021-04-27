import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation";
import SideNavigation from "./components/SideNavigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./components/Home";
import Search from "./components/Search";

import * as sessionActions from "./store/session";

function App() {
	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			await dispatch(sessionActions.restoreUser());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}
	return (
		<BrowserRouter>
			<Navigation />
			<SideNavigation />
			<Switch>
				<ProtectedRoute path="/home" exact={true}>
					{/* <Home /> */}
				</ProtectedRoute>
				<Route path="/home/search/:query" exact={true}>
					<Search />
				</Route>
				<Route path="/">
					<Redirect to="/home" />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
