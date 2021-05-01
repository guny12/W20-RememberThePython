import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import * as taskActions from "../../store/tasks";
// import * as listActions from "../../store/lists";
import { useDispatch, useSelector } from "react-redux";
import "./QuickLook.css";
import { Toast } from "react-bootstrap";

const QuickLook = ({ listId }) => {
	const dispatch = useDispatch();
	const [isLoaded, setLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			await dispatch(taskActions.getListTasks(listId));
			setLoaded(true);
		})();
	}, [dispatch, listId]);

	const tasks = useSelector((state) => state.tasks.allTasks);

	const listTasks = {};
	if (listId > 0) {
		for (const task in tasks) if (tasks[task].listId === listId) listTasks[task] = tasks[task];
	}

	const tasksDiv = listId > 0 ? Object.values(listTasks) : Object.values(tasks);

	let complete = async (taskId) => {
		let taskIdObj = {};
		taskIdObj[`${taskId}`] = taskId;
		await dispatch(taskActions.updateCheckedTasks(taskIdObj, "completed"));
		await dispatch(taskActions.getListTasks(listId));
	};

	let uncompleted = tasksDiv?.map((task) => {
		if (task.completed === false) {
			return (
				<Toast key={`toast-${task.id}`}>
					<Toast.Header closeLabel="complete" closeButton={false}>
						<strong className="mr-auto">{`Priority: ${task.priority ? task.priority : "None"}`}</strong>
						<small className="toast-small-header">{`Due Date: ${task.dueDate ? task.dueDate : "None"}`}</small>
						<small className="toast-small-header">{`Completed: ${task.completed}`}</small>
						<button onClick={() => complete(task.id)} className="quick-look__complete">
							<i className="fas fa-check-square"></i>
						</button>
					</Toast.Header>
					<Toast.Body>{`${task.content}`}</Toast.Body>
				</Toast>
			);
		}
		return [];
	});

	uncompleted = uncompleted.flat(1);
	if (uncompleted.length === 0) {
		uncompleted = (
			<Toast key={`toast-uncomplete`}>
				<Toast.Header closeLabel="complete" closeButton={false}></Toast.Header>
				<Toast.Body>You've completed all your tasks</Toast.Body>
			</Toast>
		);
	}

	if (!isLoaded) return null;

	return <div>{uncompleted}</div>;
};
export default QuickLook;
