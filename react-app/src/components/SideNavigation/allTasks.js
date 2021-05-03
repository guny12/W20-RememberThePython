import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Task from "../Tasks/index";
import AddTask from "../Tasks/AddTask";
import EditTasks from "../Tasks/EditTasks";
import "./AllTasks.css";
import TaskDisplay from "../TaskDisplay"
import DefaultDisplay from "../DefaultDisplay"


const AllTasks = ({ listId }) => {

	const dispatch = useDispatch();
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

	const taskSelector = (task) => {
		console.log(task)
		setSelectedTask(task)
		setSelected(!selected)
	}

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
						<div onClick={() => taskSelector(task)}>
							<Task task={task} key={task.id} />
						</div>
					))}
				</div>
			</div>

			<div className="task-sub-container">
				{!selected && <DefaultDisplay tasks={tasks} currentList={currentList}/>}
				{selected && <TaskDisplay lists={lists} selectedTask={selectedTask} currentList={currentList}/>}
			</div>
		</div>
	);
};




export default AllTasks;
