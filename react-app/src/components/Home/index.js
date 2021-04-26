import React from "react";
import { useSelector } from "react-redux";
import "./Home.css";

const Home = () => {
	const loggedIn = useSelector((state) => state.session.user?.id);
	const userName = useSelector((state) => state.session.user?.username);

	return (
		<div>
			{loggedIn && (
				<>
					<h2>{` Welcome ${userName}!`}</h2>
				</>
			)}
		</div>
	);
};

export default Home;
