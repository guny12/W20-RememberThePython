import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Nav, Navbar, Button } from "react-bootstrap";

import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignUpModal";
import * as sessionActions from "../../store/session";
import { searchQuery } from "../../store/search";

import "./Navigation.css";

const Navigation = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [search, setSearch] = useState("");

	let sessionLinks;
	let searchBar;

	const handleSubmit = async () => {
		await dispatch(sessionActions.login({ credential: "demoUser@user.io", password: "password" }));
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		await dispatch(searchQuery(search));
		setSearch("");
	};

	if (sessionUser) {
		sessionLinks = (
			// if logged in links
			<>
				<ProfileButton user={sessionUser} />
			</>
		);

		searchBar = (
			<form
				className="nav-search-bar"
				onSubmit={handleSearch}
			>
				<i className="fas fa-search"></i>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</form>
		);
	} else {
		sessionLinks = (
			<>
				<LoginFormModal />
				<SignUpModal />
				<Button variant="dark" onClick={() => handleSubmit()}>
					Demo User
				</Button>
			</>
		);

		searchBar = (<></>);
	}

	return (
		<Navbar bg="primary" variant="dark" className="nav-container">
			{searchBar}
			<Nav className="mr-auto" id="nav-profile">
				{sessionLinks}
			</Nav>
		</Navbar >
	);
};

export default Navigation;
