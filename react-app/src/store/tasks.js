export const LOAD_ALL_TASKS = "task/LOAD_ALL_TASKS";
const CLEAR_TASKS = "task/CLEAR_TASKS";
const CHECK_TASK = "task/CHECK_TASK";
const UNCHECK_TASK = "task/UNCHECK_TASK";

const checkTask = (taskId) => ({
	type: CHECK_TASK,
	payload: taskId
});

const uncheckTask = (taskId) => ({
	type: UNCHECK_TASK,
	payload: taskId
});

const loadAllTasks = (tasks) => ({
	type: LOAD_ALL_TASKS,
	payload: tasks,
});

const clearTasks = () => ({
	type: CLEAR_TASKS,
});

// load all Tasks
export const getTasks = () => async (dispatch) => {
	const response = await fetch("/api/task/all");
	if (response.ok) {
		const tasks = await response.json();
		dispatch(loadAllTasks(tasks));
	}
};

// load all tasks related to listId
// even if the backend accepts a GET request body
// react will throw an error :(
export const getListTasks = (listId) => async (dispatch) => {
	const response = await fetch(`/api/task/${listId}/all`);

	if (response.ok) {
		const tasks = await response.json();
		dispatch(loadAllTasks(tasks));
	}
};

// create a new task
export const newTask = (taskDetails) => async (dispatch) => {
	const { listId, content, completed, startDate, dueDate, priority } = taskDetails;
	const response = await fetch("/api/task/", {
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

// clear all tasks
export const clearAllTasks = () => async (dispatch) => {
	dispatch(clearTasks());
};

// check task
export const checkATask = (taskId) => async (dispatch) => {
	dispatch(checkTask(taskId));
};

// uncheck task
export const uncheckATask = (taskId) => async (dispatch) => {
	dispatch(uncheckTask(taskId));
};

//========== TASK slice of state reducer
const initialState = { allTasks: {}, selectedTasks: {}, checkedTasks: {} };

const taskReducer = (taskState = initialState, action) => {
	let newState;

	switch (action.type) {
		case LOAD_ALL_TASKS:
			let { tasks } = action.payload;
			let normalizeAllTasks = tasks.reduce((newTasks, task) => {
				return { ...newTasks, [task.id]: task };
			}, {});
			return { ...taskState, allTasks: normalizeAllTasks };
		case CLEAR_TASKS:
			return initialState;
		case CHECK_TASK:
			newState = Object.assign({}, taskState);
			newState.checkedTasks[action.payload] = action.payload;
			return newState;
		case UNCHECK_TASK:
			newState = Object.assign({}, taskState);
			delete newState.checkedTasks[action.payload];
			return newState;
		default:
			return taskState;
	}
};

export default taskReducer;
