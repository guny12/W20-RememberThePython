import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Hometab.css";

const Hometab = () => {
	// const dispatch = useDispatch();
	const allCurrentLists = useSelector((state) => state?.lists?.allLists);

	const listTab = (list) => {
		document.querySelector(`#sideNav-tab-${list.id}`).click();
	};

	let cards = Object.values(allCurrentLists).map((list) => (
		<div key={`card-list#${list.id}`}>
			<Card className="listCard">
				<Card.Body>
					<Card.Title>{list.title}</Card.Title>
				</Card.Body>
				<Card.Footer>
					<Button className="card-footer-Tasks" onClick={() => listTab(list)}>{`${list?.numTasks} tasks`}</Button>
					<Button className="card-footer-Quicklook">Quick Look</Button>
				</Card.Footer>
			</Card>
		</div>
	));

	return <>{cards}</>;
};

export default Hometab;
