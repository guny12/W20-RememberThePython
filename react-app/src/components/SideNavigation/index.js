import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Nav, Navbar, Button, TabContainer, Tab, Col, Row } from "react-bootstrap";
import { getAllLists, deleteList } from "../../store/lists";
import ListBrowser from "../lists";
import EditListModal from "../EditListModal";
import ListModal from "../../components/ListModal";
import AllTasks from "./allTasks";

import styles from "./SideNavigation.module.css";

const SideNavigation = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const lists = useSelector((state) => state.lists.allLists);

	const handleDelete = async (e) => {
		e.preventDefault();
		const toBeDeleted = {
			listId: e.target.id,
		};
		await dispatch(deleteList(toBeDeleted));
		dispatch(getAllLists());
		return history.push("/lists");
	};

	useEffect(() => {
		dispatch(getAllLists());
	}, [dispatch]);

	if (!sessionUser) return null;
	return (
		<Tab.Container id="left-tabs-example" defaultActiveKey="first">
			<Row>
				<Col sm={1.5}>
					<Nav variant="pills" className="flex-column">
						<Nav.Item>
							<Nav.Link eventKey="inbox">Inbox</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="allTasks">All Tasks</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="today">Today</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="tomorrow">Tomorrow</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="thisWeek">This Week</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="givenToOthers">Given to others</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="trash">Trash</Nav.Link>
						</Nav.Item>
						<div className={styles.list_div}>
							<h3>-Lists</h3>
							<ListModal />
						</div>
						{lists?.map((lis) => (
							<Nav.Item key={lis.id} className={styles.list_div}>
								<Nav.Link eventKey={lis.title} className={styles.listName}>
									{lis.title}
								</Nav.Link>
								<EditListModal title={lis.title} id={lis.id} />
								<Button id={lis.id} onClick={handleDelete} className={styles.deleteBtn}>
									<i id={lis.id} className="far fa-trash-alt"></i>
								</Button>
							</Nav.Item>
						))}
					</Nav>
				</Col>
				<Col sm={8}>
					<Tab.Content>
						<Tab.Pane eventKey="inbox">
							<p> test</p>
						</Tab.Pane>
						<Tab.Pane eventKey="allTasks">
							<AllTasks listId = {0}/>
							{/* SWAP THIS OUT WITH ALL TASK LISTS WHEN IT COMES  */}
						</Tab.Pane>
						<Tab.Pane eventKey="today">
							<p> test</p>
						</Tab.Pane>
						<Tab.Pane eventKey="tomorrow">
							<p> test</p>
						</Tab.Pane>
						<Tab.Pane eventKey="thisWeek">
							<p> test</p>
						</Tab.Pane>
						<Tab.Pane eventKey="givenToOthers">
							<p> test</p>
						</Tab.Pane>
						<Tab.Pane eventKey="trash">
							<p> test</p>
						</Tab.Pane>
						{lists?.map((lis) => (
							<Tab.Pane eventKey={lis.title} key={lis.id}>
								<p id={lis.id}>{lis.title}</p>
								<Tab.Pane>
									<AllTasks listId={lis.id}/>
								</Tab.Pane>
							</Tab.Pane>
						))}
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

export default SideNavigation;
