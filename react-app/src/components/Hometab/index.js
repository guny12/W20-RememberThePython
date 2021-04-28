import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Hometab.css";

const Hometab = () => {
	// const dispatch = useDispatch();
	const allCurrentLists = useSelector((state) => state?.lists?.allLists);

	// let userLists;
	// if (allCurrentLists && allCurrentLists.length > 0) {
	// 	userLists = <h1> You have lists</h1>;
	// } else {
	// 	userLists = <h1> You Don't have any lists, go make some</h1>;
	// }

	return <h1> home</h1>;
};

export default Hometab;
