import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Hometab.css";

const Hometab = () => {
	// const dispatch = useDispatch();
	const allCurrentLists = useSelector((state) => state?.lists?.allLists);

	const hometab = document.getElementById("sideNav-tab-home");
	if (hometab) hometab.click();

	// let userLists;
	// if (allCurrentLists && allCurrentLists.length > 0) {
	// 	userLists = <h1> You have lists</h1>;
	// } else {
	// 	userLists = <h1> You Don't have any lists, go make some</h1>;
	// }

	return <></>;
};

export default Hometab;
