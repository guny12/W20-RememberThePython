import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import QuickLookModal from "../QuickLookModal";
import "./Hometab.css";

const Hometab = () => {
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
					<QuickLookModal />
				</Card.Footer>
			</Card>
		</div>
	));

	return <>{cards}</>;
};

export default Hometab;
