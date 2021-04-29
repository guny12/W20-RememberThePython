import React from "react";
import "./Home.css";

const Home = ({ listLoaded }) => {
	console.log("WAS SENT TO HOME------------------------------------");
	if (listLoaded) document.querySelector("#sideNav-tab-home").click();

	return <></>;
};

export default Home;
