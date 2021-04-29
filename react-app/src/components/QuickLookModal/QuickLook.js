import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import * as taskActions from "../../store/tasks";
// import * as listActions from "../../store/lists";
import { useDispatch, useSelector } from "react-redux";
import "./QuickLook.css";
import { Button, Form, Toast, Row, Col } from "react-bootstrap";
import AllTasks from "../SideNavigation/allTasks";

const QuickLook = ({ listId }) => {
	// const history = useHistory();
	const dispatch = useDispatch();
	const close = document.querySelector("#modal-background");
	useEffect(async () => {
		await dispatch(taskActions.getListTasks(listId));
	}, [dispatch]);

	const tasksQuery = useSelector((state) => state.search.results);
	const tasks = useSelector((state) => state.tasks.allTasks);
	const listTasks = {};

	if (listId > 0) {
		for (const task in tasks) {
			if (tasks[task].listId === listId) {
				listTasks[task] = tasks[task];
			}
		}
	} else if (listId === -1 && tasksQuery) {
		for (const key in tasksQuery.taskResults) {
			listTasks[key] = tasksQuery.taskResults[key];
		}
	}
	let tasksDiv;
	if (listId > 0) {
		tasksDiv = Object.values(listTasks);
	} else if (listId === -1 && tasksQuery) {
		tasksDiv = Object.values(listTasks);
	} else {
		tasksDiv = Object.values(tasks);
	}

	let taskId = false;
	let complete = (taskId) => {
		console.log("completed");
		taskId = "true";
	};
	return (
		<div>
			{tasksDiv?.map((task) => (
				<Toast onClose={() => complete(task.id)}>
					<Toast.Header>
						<strong className="mr-auto">{`Priority: ${task.priority ? task.priority : "None"}`}</strong>
						<small>{`Due Date: ${task.dueDate ? task.dueDate : "None"}`}</small>
					</Toast.Header>
					<Toast.Body>{`${task.content}`}</Toast.Body>
				</Toast>
			))}
		</div>
	);
	// <AllTasks listId={listId} />;
};
export default QuickLook;
