import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Tasks.css';
import * as taskActions from "../../store/tasks";

function TaskDisplay({ listId }) {
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

	let tasksDiv;
	if (listId > 0) {
		tasksDiv = Object.values(listTasks);
	} else if (listId === -1 && tasksQuery) {
		tasksDiv = Object.values(listTasks);
	} else {
		tasksDiv = Object.values(tasks);
	}


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
		const newTask = await dispatch(taskActions.newTask(payload));
	};

  return (
    <div className="outer">
    
		<div>
			<form>
				<input
						type="text"
						placeholder="Add a task..."
						required
						value={content}
						onChange={(e) => setContent(e.target.value)}
					></input>
				<button type="submit">Add Task</button>

			</form>
		</div>
    
    {/* <div className="task-container">
      <input type="checkbox" value={task.id} />
      <h1>{task.content}</h1>
    </div> */}

		{/* <div className="task-list-container">
			{tasksDiv?.map((task) => (
				<Task task={task} key={task.id} />
			))}
		</div> */}

    </div>
  )
}

export default TaskDisplay