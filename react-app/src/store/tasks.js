const LOAD_ALL_TASKS = "task/LOAD_ALL_TASKS";

const loadAllTasks = (tasks) => ({
	type: LOAD_ALL_TASKS,
	payload: tasks,
});

// load all Tasks
export const getTasks = () => async (dispatch) => {
	const response = await fetch("/api/task/all");
	if (response.ok) {
		const tasks = await response.json();
		dispatch(loadAllTasks(tasks));
	}
};

// create a new task
export const newTask = (taskDetails) => async (dispatch) => {
	const { listId, content, completed, startDate, duedate, priority } = taskDetails;
	const response = await fetch("/api/task", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			listId,
			content,
			completed,
			startDate,
			dueDate,
			priority,
		}),
	});
	const data = await response.json();
	if (data.errors) return data;
	dispatch(getTasks());
};

// taskDetails is the object that is submitted, when you click 'Edit Task' -> *form appears with fields populated* -> click 'OK'
// export const editedTask = (taskDetails) => async (dispatch) => {
// 	const { content, taskId } = taskDetails;
// 	const response = await fetch("/api/task", {
// 		method: "PATCH",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			content,
// 			taskId,
// 		}),
// 	});

// 	const data = await response.json();
// 	if (data.errors) return data;
// 	dispatch(editTask(data.task));
// 	return data;
// };

// for deletetask
export const removeTask = (taskId) => async (dispatch) => {
	const response = await fetch("/api/task/", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			taskId,
		}),
	});

	const data = await response.json();
	if (data.errors) return data;
	dispatch(getTasks());
};

//========== TASK slice of state reducer
const initialState = { allTasks: {}, selectedTasks: {} };

const taskReducer = (taskState = initialState, action) => {
	switch (action.type) {
		case LOAD_ALL_TASKS:
			let { tasks } = action.payload;
			let normalizeAllTasks = tasks.reduce((newTasks, task) => {
				return { ...newTasks, [task.id]: task };
			}, {});
			return { ...taskState, allTasks: normalizeAllTasks };
		default:
			return taskState;
	}
};

export default taskReducer;
