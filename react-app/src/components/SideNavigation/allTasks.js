import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from "../../store/tasks";
import Task from "../Tasks/index";
import "./AllTasks.css"

const TaskSub = () => {
};

const AllTasks = ({ listId }) => {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks.allTasks);
	const lists = useSelector((state) => state.lists.allLists);
	console.log(lists, "LISTS!!!!!")
	
	let currentList;
	// const [currentList] = lists?.filter(list => list.id === listId)
	// console.log(currentList)
	// const list = lists.map(listId => listId ===list.)

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
	const [selected, setSelected] = useState(true)
	const [selectedTask, setSelectedTask] = useState({})

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
		const newTask = await dispatch(taskActions.newTask(payload));
	};

	let tasksDiv;
	if (listId > 0) {
		tasksDiv = Object.values(listTasks);
	} else if (listId === -1 && tasksQuery) {
		tasksDiv = Object.values(listTasks);
	} else {
		tasksDiv = Object.values(tasks);
	}

	const test = (task) => {
		console.log(task)
		setSelectedTask(task)
		setSelected(!selected)
		// currentList = lists.filter(list => list.id === listId)
		// currentList = currentList[0]
		// console.log(currentList)
	}

	// onChange = (e) => {
	// 	e.preventDefault()

	// 	dispatch(editTask(e.target.value, newListId))
	// }

	return (
		<div className="outer">
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
						<p>{Object.keys(tasks).length} tasks</p>
						<p>0 completed</p>
					</div>
				}
				{selected &&
					<div className="task-details-page">
						<h2>{selectedTask.content}</h2>
						<select>
							<option>{selectedTask.dueDate}due date</option>
						</select>
						<select>
							{lists?.map(list =>(<option value={list.id}>{list.title}</option>)
								)}
							{/* <option>{lists[selectedTask.listId].title}</option> */}
						</select>
					</div>
				}
			</div>
		</div>
	);
};

export default AllTasks;
