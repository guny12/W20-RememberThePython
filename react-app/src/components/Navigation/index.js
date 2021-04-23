import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import LoginFormModal from "../LoginFormModal";
import SignUpModal from "../SignUpModal";
import { Nav, Navbar, Button } from "react-bootstrap";
import * as sessionActions from "../../store/session";

const Navigation = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);
	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			// if logged in links
			<>
				<LogoutButton />
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
	const handleSubmit = () => {
		setErrors([]);
		return dispatch(sessionActions.loginThunk({ credential: "demo@user.io", password: "password" }))
			.then((response) => (response.ok ? history.push("/home") : response))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	return (
		<Navbar bg="primary" variant="light">
			<Nav className="mr-auto">
				<NavLink to="/" exact={true} activeClassName="active">
					Home
				</NavLink>
				{/* <NavLink to="/users" exact={true} activeClassName="active">
					Users
				</NavLink> */}
				{sessionLinks}
			</Nav>
		</Navbar>
	);
};

export default Navigation;
