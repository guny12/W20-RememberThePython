import React, { useEffect } from "react";
// import { useHistory } from "react-router-dom";
import * as taskActions from "../../store/tasks";
// import * as listActions from "../../store/lists";
import { useDispatch, useSelector } from "react-redux";
import "./QuickLook.css";
import { Toast } from "react-bootstrap";

const QuickLook = ({ listId }) => {
	// const history = useHistory();
	const dispatch = useDispatch();
	// const close = document.querySelector("#modal-background");
	useEffect(() => {
		(async () => {
			await dispatch(taskActions.getListTasks(listId));
		})();
	}, [dispatch, listId]);

	const tasks = useSelector((state) => state.tasks.allTasks);
	const listTasks = {};

	if (listId > 0) {
		for (const task in tasks) {
			if (tasks[task].listId === listId) {
				listTasks[task] = tasks[task];
			}
		}
	}

	let tasksDiv;
	if (listId > 0) {
		tasksDiv = Object.values(listTasks);
	} else {
		tasksDiv = Object.values(tasks);
	}

	let complete = async (taskId) => {
		await dispatch(taskActions.editedTask({ taskId: taskId, completed: true }));
	};

	return (
		<div>
			{tasksDiv?.map((task) => (
				<Toast>
					<Toast.Header closeLabel="complete" closeButton={false}>
						<strong className="mr-auto">{`Priority: ${task.priority ? task.priority : "None"}`}</strong>
						<small>{`Due Date: ${task.dueDate ? task.dueDate : "None"}`}</small>
						<small>{`Completed: ${task.completed}`}</small>
						<button onClick={() => complete(task.id)} className="quick-look__complete">
							<i className="fas fa-check-square"></i>
						</button>
					</Toast.Header>
					<Toast.Body>{`${task.content}`}</Toast.Body>
				</Toast>
			))}
		</div>
	);
};
export default QuickLook;
