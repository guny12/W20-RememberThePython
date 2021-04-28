import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { Button } from "react-bootstrap";

import "./Navigation.css";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const currentUser = useSelector((state) => state.session.user);
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
		history.go(0);
	};

	const deleteUser = async () => {
		if (currentUser.id === 1) {
			window.alert(`Please make an account if you want to delete an account!

			Redirecting to 30min. ad videos...`);

			return;
		}

		await dispatch(sessionActions.deleteUser());
		await dispatch(sessionActions.logout());
		history.go(0);
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
