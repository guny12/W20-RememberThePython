import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from "../../store/tasks";
import Task from "../Tasks/index";
import "./AllTasks.css"
import AddTask from "../Tasks/AddTask";

const defaultDisplay = (tasks, currentList) => {

	return (
		<div>
			<h4>{currentList && currentList.title}</h4>
			<div className="num-display">
				<div className="num-tasks">
					<h5>{Object.values(tasks).length}</h5>
					<p>tasks</p>
				</div>
				<div className="num-completed">
					<h5>0</h5>
					<p>completed</p>
				</div>
			</div>
		</div>
	)
}

const taskDisplay = (lists, selectedTask) => {

	return (
		<div className="task-details-page">
			<h4>{selectedTask.content}</h4>
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
	)
}

const AllTasks = ({ listId }) => {

	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks.allTasks);
	const lists = useSelector((state) => state.lists.allLists);
	
	let currentList;

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
		currentList = lists.filter(list => list.id === listId)
		currentList = currentList[0]
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
	const [selected, setSelected] = useState(false)
	const [selectedTask, setSelectedTask] = useState({})


	let tasksDiv;
	if (listId > 0) {
		tasksDiv = Object.values(listTasks);
	} else if (listId === -1 && tasksQuery) {
		tasksDiv = Object.values(listTasks);
	} else {
		tasksDiv = Object.values(tasks);
	}

	const taskSelector = (task) => {
		console.log(task)
		setSelectedTask(task)
		setSelected(!selected)
	}

	return (
		<div className="outer-shell">

			<div className="task-page-container">
				<div className="task-form-container">
					<AddTask listId={listId}/>
				</div>

				<div className="task-list-container">
					{tasksDiv?.map((task) => (
						<div onClick={() => taskSelector(task)}>
							<Task task={task} key={task.id} />
						</div>
					))}
				</div>
			</div>
				
			<div className="task-sub-container">
				{!selected && defaultDisplay(tasks, currentList)}
				{selected && taskDisplay(lists, selectedTask)}
			</div>

		</div>
	);
};




export default AllTasks;
