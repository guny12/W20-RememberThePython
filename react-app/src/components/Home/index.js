import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Home.css";

const Home = () => {
	// const dispatch = useDispatch();
	const allCurrentLists = useSelector((state) => state?.lists?.allLists);
	const centerDiv = document.querySelector("#tabs-center");

	let userLists;
	if (allCurrentLists && allCurrentLists.length > 0 && centerDiv) {
		userLists = <h1> You have lists</h1>;
		centerDiv.replaceWith(userLists);
	} else {
		userLists = <h1> You Don't have any lists, go make some</h1>;
	}

	return <>{userLists}</>;
};

export default Home;
