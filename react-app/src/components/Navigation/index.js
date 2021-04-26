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

	if (sessionUser) {
		sessionLinks = (
			// if logged in links
			<>
				<ProfileButton user={sessionUser} />
			</>
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
	}

	const handleSubmit = async () => {
		await dispatch(sessionActions.login({ credential: "demoUser@user.io", password: "password" }));
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		await dispatch(searchQuery(search));
		setSearch("");
	};

	return (
		<Navbar bg="primary" variant="dark">
			<Nav className="mr-auto">
				<NavLink to={"/"} className="nav-link">
					Home
				</NavLink>
				{sessionLinks}
			</Nav>
			<form
				className="nav-search-bar"
				onSubmit={handleSearch}
			>
				<input
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</form>
		</Navbar>
	);
};

export default Navigation;
