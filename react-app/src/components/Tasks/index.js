import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkATask, uncheckATask } from "../../store/tasks";
import "./Tasks.css";

function Task({ task }) {
	const dispatch = useDispatch();
	const checkTask = useSelector((state) => state.tasks.checkedTasks[task.id]);
	const primaryCheckbox = useSelector((state) => state.checkboxes.parentCheckbox);

	const handleCheck = () => {
		if (checkTask) {
			dispatch(uncheckATask(task.id));
		} else {
			dispatch(checkATask(task.id));
		}
	};

	return (
		<div onClick={handleCheck} className="task-container">
			{!checkTask &&
				<i
					className="far fa-square"
				/>
			}
			{checkTask &&
				<i
					className="far fa-check-square"
				/>
			}
			<h1>{task.content}</h1>
		</div>
	);
}

export default Task;
