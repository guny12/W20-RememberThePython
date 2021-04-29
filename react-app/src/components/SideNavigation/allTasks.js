import React, { useState } from "react";
import { useSelector } from "react-redux";
import Task from "../Tasks/index";
import AddTask from "../Tasks/AddTask";
import EditTasks from "../Tasks/EditTasks";

import "./AllTasks.css"


const AllTasks = ({ listId }) => {
	const tasks = useSelector((state) => state.tasks.allTasks);
	const lists = useSelector((state) => state.lists.allLists);
	const [selected, setSelected] = useState(false);
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
		currentList = lists.filter(list => list.id === listId)
		currentList = currentList[0]
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

	const test = (task) => {
		setSelectedTask(task);
		setSelected(!selected);
	}

	return (
		<div className="outer-shell">

			<div className="task-page-container">
				<EditTasks listId={listId} />
				{listId > 0 &&
					<div className="task-form-container">
						<AddTask listId={listId} />
					</div>}
				<div className="task-list-container">
					{tasksDiv?.map((task) => (
						<div onClick={() => test(task)}>
							<Task task={task} key={task.id} />
						</div>
					))}
				</div>
			</div>

			<div className="task-sub-container">
				{!selected &&
					<div>
						<h4>{currentList && currentList.title}</h4>
						<div className="num-display">
							<div className="num-tasks">
								<h5>{Object.keys(tasks).length}</h5>
								<p>tasks</p>
							</div>
							<div className="num-completed">
								<h5>0</h5>
								<p>completed</p>
							</div>
						</div>
					</div>
				}
				{selected &&
					<div className="task-details-page">
						<h2 className="task-content-header">{selectedTask.content}</h2>
						<div className="dropdowns">
							<div className="dropdown-due-date">
								<label>due</label>
								<select>
									<option>{selectedTask.dueDate}due date</option>
								</select>
							</div>
							<div className="dropdown-list">
								<label>list</label>
								<select>
									{lists?.map(list => (<option value={list.id}>{list.title}</option>)
									)}
								</select>
							</div>
						</div>
					</div>
				}
			</div>

		</div>
	);
};

export default AllTasks;
