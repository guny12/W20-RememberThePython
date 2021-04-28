import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation";
import SideNavigation from "./components/SideNavigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Search from "./components/Search";
import Landing from "./components/Landing";

import * as sessionActions from "./store/session";
import * as taskActions from "./store/tasks";
import * as listActions from "./store/lists";

function App() {
	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		(async () => {
			let response = await dispatch(sessionActions.restoreUser());
			if (response.message == "success") {
				(async () => await dispatch(taskActions.clearAllTasks()))();
				(async () => await dispatch(listActions.getAllLists()))();
			}
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	// PLEASE DO NOT COMMENT OUT HOME COMPONENT
	return (
		<BrowserRouter>
			<Navigation />
			{/* <SideNavigation /> */}
			<Switch>
				<ProtectedRoute path="/home" exact={true}>
					<SideNavigation />
				</ProtectedRoute>
				<Route path="/home/search/:query" exact={true}>
					<Search />
				</Route>
				<Route path="/landing" exact={true}>
					<Landing />
				</Route>
				<Route path="/">
					<Redirect to="/landing" />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
