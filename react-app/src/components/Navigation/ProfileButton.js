import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { Button } from "react-bootstrap";

import "./Navigation.css";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;
		const closeMenu = () => {
			setShowMenu(false);
		};
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const logout = async () => {
		await dispatch(sessionActions.logout());
	};

	const deleteUser = async () => {
		// WIP
		console.log("WIP");
	};

	return (
		<>
			<Button className="btn btn-dark" onClick={openMenu}>
				<i className="fas fa-cog" />
			</Button>
			{showMenu && (
				<ul className="profile-dropdown">
					<li>{user.username}</li>
					<li>{user.email}</li>
					<li>
						<button onClick={logout}>Log Out</button>
					</li>
					<li>
						<button onClick={deleteUser}>Delete Account</button>
					</li>
				</ul>
			)}
		</>
	);
}

export default ProfileButton;
