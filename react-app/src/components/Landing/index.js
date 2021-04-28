import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Landing = () => {
	const history = useHistory();
	const currentUser = useSelector((state) => state.session.user?.id);

	if (currentUser) history.push("/home");

	return (
		<h1>
			Welcome to MemberBerry, please sign up or log in to get started<p> you can also test it out as a demo user</p>
		</h1>
	);
};

export default Landing;
