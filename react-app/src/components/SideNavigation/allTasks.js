import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from "../../store/tasks";
import * as listActions from "../../store/lists";
import Task from "../Tasks/index";

const AllTasks = ({ listId }) => {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks.allTasks);
	const tasksQuery = useSelector((state) => state.search.results);
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

	// const handleDelete = async (e) => {
	//   e.preventDefault();
	//   const toBeDeleted = {
	//     listId: e.target.id,
	//   };
	//   await dispatch(deleteList(toBeDeleted));
	//   dispatch(getAllLists());
	//   return history.push("/lists");
	// };

	const [content, setContent] = useState("");
	const [completed, setCompleted] = useState(false);
	const [startDate, setStartDate] = useState(null);
	const [dueDate, setDueDate] = useState(null);
	const [priority, setPriority] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const payload = {
			content,
			listId,
			completed,
			startDate,
			dueDate,
			priority,
		};
		await dispatch(taskActions.newTask(payload));
		await dispatch(listActions.getAllLists());
	};

	let tasksDiv;
	if (listId > 0) {
		tasksDiv = Object.values(listTasks);
	} else if (listId === -1 && tasksQuery) {
		tasksDiv = Object.values(listTasks);
	} else {
		tasksDiv = Object.values(tasks);
	}

	return (
		<div className="task-page-container">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Add a task..."
					required
					value={content}
					onChange={(e) => setContent(e.target.value)}
				></input>
				<button type="submit">Add Task</button>
			</form>
			<div className="task-list-container">
				{tasksDiv?.map((task) => (
					<Task task={task} key={task.id} />
				))}
			</div>
		</div>
	);
};

export default AllTasks;
