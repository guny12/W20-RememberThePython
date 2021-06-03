import { deepCopy } from "../services/deepCopy";

export const LOAD_ALL_TASKS = "task/LOAD_ALL_TASKS";
const CLEAR_TASKS = "task/CLEAR_TASKS";
const CHECK_TASK = "task/CHECK_TASK";
const BULK_CHECK_TASK = "task/BULK_CHECK_TASK";
const UNCHECK_TASK = "task/UNCHECK_TASK";
const BULK_UNCHECK_TASK = "task/BULK_UNCHECK_TASK";
const UPDATE_SELECTED_TASKS = "task/UPDATE_SELECTED_TASKS";
const DELETE_SELECTED_TASKS = "task/DELETE_SELECTED_TASKS";

export const checkTask = (taskId) => ({
	type: CHECK_TASK,
	payload: taskId,
});

export const bulkCheckTask = (tasks) => ({
	type: BULK_CHECK_TASK,
	payload: tasks
});

export const uncheckTask = (taskId) => ({
	type: UNCHECK_TASK,
	payload: taskId,
});

export const bulkUncheckTask = () => ({
	type: BULK_UNCHECK_TASK
});

export const updateSelectedTasks = (tasksObj) => ({
	type: UPDATE_SELECTED_TASKS,
	payload: tasksObj,
});

export const deleteSelectedTasks = (tasksObj) => ({
	type: DELETE_SELECTED_TASKS,
	payload: tasksObj,
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
	dispatch(getListTasks(listId));
};

// edit task
export const editedTask = (taskDetails) => async (dispatch) => {
	const { taskId, content, completed, startDate, dueDate, priority } = taskDetails;
	const response = await fetch("/api/task", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			taskId,
			content,
			completed,
			startDate,
			dueDate,
			priority,
		}),
	});

	const data = await response.json();
	if (data.errors) return data;
	// dispatch(editTask(data.task));
	return data;
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

export const updateCheckedTasks = (tasksObj, updateType, priority) => async (dispatch) => {
	const response = await fetch("/api/task/", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			tasksObj,
			updateType,
			priority
		}),
	});
	const data = await response.json();
	if (response.ok) dispatch(updateSelectedTasks(data));
	if (!response.ok) return { message: "error updating tasks" };
};

export const deleteCheckedTasks = (tasksObj) => async (dispatch) => {
	const response = await fetch("/api/task/", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			tasksObj,
		}),
	});
	if (!response.ok) return { message: "error deleting tasks" };
	if (response.ok) {
		dispatch(deleteSelectedTasks(tasksObj));
		return await response.json();
	}
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
			newState = Object.assign({ allTasks: {}, selectedTasks: {}, checkedTasks: {} });
			return newState;
		case CHECK_TASK:
			newState = Object.assign({}, taskState);
			newState.checkedTasks[action.payload] = parseInt(action.payload, 10);
			return newState;
		case BULK_CHECK_TASK:
			newState = Object.assign({}, taskState);
			newState.checkedTasks = deepCopy(action.payload);
			return newState;
		case UNCHECK_TASK:
			newState = Object.assign({}, taskState);
			delete newState.checkedTasks[action.payload];
			return newState;
		case BULK_UNCHECK_TASK:
			newState = Object.assign({}, taskState);
			newState.checkedTasks = {};
			return newState;
		case UPDATE_SELECTED_TASKS:
			newState = Object.assign({}, taskState);
			for (const key in action.payload) {
				newState.allTasks[key] = action.payload[key];
			}
			return newState;
		case DELETE_SELECTED_TASKS:
			newState = Object.assign({}, taskState);
			for (const key in action.payload) {
				delete newState.checkedTasks[key];
				delete newState.allTasks[key];
			}
			return newState;
		default:
			return taskState;
	}
};

export default taskReducer;
