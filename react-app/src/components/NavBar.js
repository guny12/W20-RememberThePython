import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";

const NavBar = ({ setAuthenticated }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/" exact={true} activeClassName="active">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/login" exact={true} activeClassName="active">
						Login
					</NavLink>
				</li>
				<li>
					<NavLink to="/sign-up" exact={true} activeClassName="active">
						Sign Up
					</NavLink>
				</li>
				<li>
					<NavLink to="/users" exact={true} activeClassName="active">
						Users
					</NavLink>
				</li>
				<li>
					<LogoutButton setAuthenticated={setAuthenticated} />
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
