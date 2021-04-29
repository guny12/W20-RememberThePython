import React from "react";
import "./Home.css";

const Home = ({ listLoaded }) => {
	// console.log(listLoaded);
	if (listLoaded) document.querySelector("#sideNav-tab-home").click();

	return <></>;
};

export default Home;
