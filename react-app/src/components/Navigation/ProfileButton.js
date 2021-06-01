import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { Dropdown } from "react-bootstrap";

import "./Navigation.css";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const currentUser = useSelector((state) => state.session.user);

	const logout = async () => {
		await dispatch(sessionActions.logout());

		// explicitly kick the user to the landing page
		// history.go(0) refuses to do that depending on
		// your initial route when server restarts
		// or browser refreshes
		history.push("/landing");
		history.go(0);
	};

	const deleteUser = async () => {
		if (currentUser.id === 1) {
			window.alert(`Please make an account if you want to delete an account!

			Redirecting to 30min. video ads...`);

			return;
		}

		await dispatch(sessionActions.deleteUser());
		await dispatch(sessionActions.logout());
		history.go(0);
	};

	return (
		<>
			<Dropdown align="end">
				<Dropdown.Toggle variant="primary" id="profile-dropdown">
					<i className="fas fa-cog" />
				</Dropdown.Toggle>
				<div id="profile-menu">
					<Dropdown.Menu>
						<Dropdown.Item>{user.username}</Dropdown.Item>
						<Dropdown.Item>{user.email}</Dropdown.Item>
						<Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
						<Dropdown.Item onClick={deleteUser}>Delete Account</Dropdown.Item>
					</Dropdown.Menu>
				</div>
			</Dropdown>
		</>
	);
}

export default ProfileButton;
