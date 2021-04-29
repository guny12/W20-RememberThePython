import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import QuickLookModal from "../QuickLookModal";
import * as listActions from "../../store/lists";
import "./Hometab.css";

const Hometab = () => {
	const dispatch = useDispatch();
	const allCurrentLists = useSelector((state) => state?.lists?.allLists);
	const [listLoaded, setListLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			let lists = await dispatch(listActions.getAllLists());
			if (lists) setListLoaded(true);
		})();
	}, [dispatch]);

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
					{list?.numTasks > 0 && <QuickLookModal listId={list.id} />}
				</Card.Footer>
			</Card>
		</div>
	));

	if (!listLoaded) return null;
	return <>{cards}</>;
};

export default Hometab;
