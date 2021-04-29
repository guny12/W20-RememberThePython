import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from "../../store/tasks";
import * as listActions from "../../store/lists";
import Task from "../Tasks/index";
import AddTask from "../Tasks/AddTask";

const AllTasks = ({ listId }) => {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks.allTasks);
	const tasksQuery = useSelector((state) => state.search.results);
	const checkedTasks = useSelector((state) => state.tasks.checkedTasks);
	const currentListTasks = useSelector((state) => state.lists.currentListTasks);
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

	const [completed, setCompleted] = useState(false);
	const [startDate, setStartDate] = useState(null);
	const [dueDate, setDueDate] = useState(null);
	const [priority, setPriority] = useState(null);



	let tasksDiv;
	if (listId > 0) {
		tasksDiv = Object.values(listTasks);
	} else if (listId === -1 && tasksQuery) {
		tasksDiv = Object.values(listTasks);
	} else {
		tasksDiv = Object.values(tasks);
	}

	// // WIP. need to refactor to ONLY use state instead of grabbing
	// // DOM elements...
	// const taskSelect = async (e, checkedTasks, currentListTasks) => {
	// 	const allTasks = document.querySelectorAll(".task-checkbox");
	// 	if (e.target.value > 0 && !currentListTasks.length) {
	// 		await dispatch(listActions.getListTaskIds(e.target.value));
	// 	}

	// 	if (e.target.checked) {
	// 		allTasks.forEach((task) => task.checked = true);
	// 		if (e.target.value > 0) {
	// 			for (const key in currentListTasks) {
	// 				console.log(key)
	// 				await dispatch(taskActions.checkATask(key));
	// 			}
	// 		}
	// 	} else {
	// 		allTasks.forEach((task) => task.checked = false);
	// 		if (e.target.value > 0) {
	// 			for (const key in currentListTasks) {
	// 				await dispatch(taskActions.uncheckATask(key));
	// 			}
	// 		}
	// 	}
	// };

	return (
		<div className="task-page-container">
			<input
				type="checkbox"
				className={`master-checkbox master-checkbox-listId-${listId}`}
				value={listId}
			// onClick={(e) => taskSelect(e, checkedTasks, currentListTasks)}
			/>
			{listId > 0 && <AddTask listId={listId} />}
			<div className="task-list-container">
				{tasksDiv?.map((task) => (
					<Task task={task} key={task.id} />
				))}
			</div>
		</div>
	);
};

export default AllTasks;
