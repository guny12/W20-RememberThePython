import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Task from "../Tasks/index";
import AddTask from "../Tasks/AddTask";
import EditTasks from "../Tasks/EditTasks";

import "./AllTasks.css";

const AllTasks = ({ listId }) => {
	const tasks = useSelector((state) => state.tasks.allTasks);
	const lists = useSelector((state) => state.lists.allLists);
	const checkedTasks = useSelector((state) => state.tasks.checkedTasks);
	const [selectedTask, setSelectedTask] = useState({});

	let currentList;

	const tasksQuery = useSelector((state) => state.search.results);
	const listTasks = {};

	if (listId > 0) {
		for (const task in tasks) {
			if (tasks[task].listId === listId) {
				listTasks[task] = tasks[task];
			}
		}
		currentList = lists.filter((list) => list.id === listId);
		currentList = currentList[0];
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

	// DO NOT REMOVE FUNCTION
	// only used for rerendering stuff
	// still WIP to remove this function
	// (only remove if ur actually going to fix it pls)
	const test = (task) => {
		setSelectedTask(task);
	};

	return (
		<div className="outer-shell">
			<div className="task-page-container">
				<EditTasks listId={listId} />
				{listId > 0 && (
					<div className="task-form-container">
						<AddTask listId={listId} />
					</div>
				)}
				<div className="task-list-container">
					{tasksDiv?.map((task) => (
						<div key={`${task.id}-task-list-container`} onClick={() => test(task)}>
							<Task task={task} key={task.id} />
						</div>
					))}
				</div>
			</div>

			<div className="task-sub-container">
				<div>
					<h4>{currentList && currentList.title}</h4>
					<div className="num-display">
						<div className="num-tasks">
							<h5>{Object.values(tasks).length}</h5>
							<p>tasks</p>
						</div>
						<div className="num-completed">
							<h5>{Object.values(tasks).filter((task) => task.completed === true).length}</h5>
							<p>completed</p>
						</div>
					</div>
				</div>
				{Object.values(checkedTasks).length === 1 &&
					Object.values(checkedTasks).map((task) => (
						<div className="task-details-page">
							<h2 className="task-content-header">{task.content}</h2>
							<div className="dropdowns">
								<div className="dropdown-due-date">
									<label>due</label>
									<select>
										<option>{task.dueDate}due date</option>
									</select>
								</div>
								<div className="dropdown-list">
									<label>list</label>
									<select>
										{lists?.map((list, idx) => (
											<option value={list.id} key={idx}>{list.title}</option>
										))}
									</select>
								</div>
							</div>
						</div>
					))
				}
				{Object.values(checkedTasks).length > 1 &&
					<div className="dropdowns">
						<div className="dropdown-due-date">
							<label>due</label>
							<select>
								<option>due date</option>
							</select>
						</div>
						<div className="dropdown-list">
							<label>list</label>
							<select>
								{lists?.map((list, idx) => (
									<option value={list.id} key={idx}>{list.title}</option>
								))}
							</select>
						</div>
					</div>
				}
			</div>
		</div>
	);
};

export default AllTasks;
