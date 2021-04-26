import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Nav, Navbar, Button, TabContainer, Tab, Col, Row } from "react-bootstrap";
import * as sessionActions from "../../store/session";
import ListBrowser from "../lists";

import "./SideNavigation.css";

const SideNavigation = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return null;
	return (
		<Tab.Container id="left-tabs-example" defaultActiveKey="first">
			<Row>
				<Col sm={3}>
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
					</Nav>
				</Col>
				<Col sm={9}>
					<Tab.Content>
						<Tab.Pane eventKey="inbox">
							<p> test</p>
						</Tab.Pane>
						<Tab.Pane eventKey="allTasks">
							<ListBrowser />
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
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

export default SideNavigation;
