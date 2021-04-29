import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation";
import SideNavigation from "./components/SideNavigation";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Search from "./components/Search";
import Landing from "./components/Landing";
import Home from "./components/Home";

import * as sessionActions from "./store/session";
import * as taskActions from "./store/tasks";
import * as listActions from "./store/lists";

function App() {
	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState(false);
	const [listLoaded, setListLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			let response = await dispatch(sessionActions.restoreUser());
			if (response.message === "success") {
				(async () => {
					let lists = await dispatch(listActions.getAllLists());
					if (lists) setListLoaded(true);
				})();
			}
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) return null;

	return (
		<BrowserRouter>
			<Navigation />
			<SideNavigation />
			<Switch>
				<ProtectedRoute path="/home" exact={true}>
					<Home listLoaded={listLoaded} />
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
