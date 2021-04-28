import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllLists } from "../../store/lists";

const Landing = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user?.firstName);

	if (currentUser) {
		history.push("/home");
	}

	return (
		<h1>
			Welcome to MemberBerry, please sign up or log in to get started<p> you can also test it out as a demo user</p>
		</h1>
	);
};

export default Landing;
