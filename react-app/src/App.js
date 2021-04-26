import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation";
import SideNavigation from "./components/SideNavigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ListBrowser from "./components/lists";
import ListModal from "./components/ListModal";
import Home from "./components/Home";

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
					<Home />
					<a href="/lists">show lists</a>
				</ProtectedRoute>
				<ProtectedRoute path="/lists" exact={true}>
					<ListModal title="Create List" />
					<ListBrowser />
				</ProtectedRoute>
				<Route path="/">
					<Redirect to="/home" />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
