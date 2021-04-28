import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Hometab.css";

const Hometab = () => {
	// const dispatch = useDispatch();
	const allCurrentLists = useSelector((state) => state?.lists?.allLists);

	let cards = Object.values(allCurrentLists).map((list) => (
		<div key={`card-list#${list.id}`}>
			<Card>
				<Card.Body>
					<Card.Title>{list.title}</Card.Title>
				</Card.Body>
				<Card.Footer>
					{/* <small className="text-muted">{`${list?.listTasks.length} tasks`}</small> */}
					<Button className="card-footer-Tasks">{`${list?.listTasks.length} tasks`}</Button>
					<Button className="card-footer-Quicklook">Quick Look</Button>
				</Card.Footer>
			</Card>
		</div>
	));

	return <div>{cards}</div>;
};

export default Hometab;
