import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllLists } from "../../store/lists";

const Home = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user?.firstName);

	useEffect(() => {
		(async () => {
			await dispatch(getAllLists());
		})();
	}, [dispatch]);

	if (!currentUser) {
		return (
			<h1>
				Welcome to MemberBerry, please sign up or log in to get started<p> you can also test it out as a demo user</p>
			</h1>
		);
	}
	return <></>;
};

export default Home;
