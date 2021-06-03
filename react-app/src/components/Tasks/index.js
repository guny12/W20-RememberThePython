import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkATask, uncheckATask } from "../../store/tasks";
import { checkMainCheckbox, uncheckMainCheckbox, indeterminateMainCheckbox } from "../../store/checkboxes";
import "./Tasks.css";

function Task({ task }) {
	const dispatch = useDispatch();
	const currentTask = useSelector((state) => state.tasks.checkedTasks[task.id]);
	const checkedTasks = useSelector((state) => state.tasks.checkedTasks);
	const allTasks = useSelector((state) => state.tasks.allTasks);
	const isComplete = useSelector((state) => state.tasks.allTasks[task.id]?.completed);

	if (!allTasks[task.id]) return null;

	const handleCheck = () => {
		if (currentTask) {
			dispatch(uncheckATask(task.id));
		} else {
			dispatch(checkATask(task.id));
		}

		const checkedTasksArr = Object.values(checkedTasks);
		const allTasksArr = Object.values(allTasks);

		if (checkedTasksArr.length && checkedTasksArr.length !== allTasksArr.length) {
			// do dispatch to set primary checkbox to a line in box (undetermined)
			dispatch(indeterminateMainCheckbox(task.listId));
		} else if (!checkedTasksArr.length) {
			// do dispatch to set primary checkbox to unchecked status
			dispatch(uncheckMainCheckbox(task.listId));
		} else if (checkedTasksArr.length === allTasksArr.length) {
			// do dispatch to check primary checkbox
			dispatch(checkMainCheckbox(task.listId));
		}
	};

	return (
		<div onClick={handleCheck} className="task-container">
			{!currentTask &&
				<i
					className="far fa-square"
				/>
			}
			{currentTask &&
				<i
					className="far fa-check-square"
				/>
			}
			{isComplete &&
				<h1 className="task-complete">{task.content}</h1>
			}
			{!isComplete &&
				<h1>{task.content}</h1>
			}
		</div>
	);
}

export default Task;
