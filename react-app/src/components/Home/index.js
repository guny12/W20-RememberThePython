import React, { useEffect } from "react";
import "./Home.css";

const Home = ({ listLoaded }) => {
	useEffect(() => {
		if (listLoaded) document.querySelector("#sideNav-tab-home").click();
	}, [listLoaded]);

	return <></>;
};

export default Home;
