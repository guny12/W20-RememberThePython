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

// load single Task
// export const getTask = (taskId) => async dispatch => {
//   const response = await fetch(`/api/task/${taskId}`);

//   if (response.ok) {
//     const task = await response.json();
//     dispatch(loadOneTask(task));
//   }
// }

// export const newTask = (taskDetails) => async (dispatch) => {
//   const { listId, content} = taskDetails;
//   const response = await fetch("/api/task", {
//     method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			listId,
// 			content,
// 		}),
//   })
// 	const data = await response.json();
// 	if (data.errors) return data;
// 	dispatch(addTask(data.task));
// 	return data;
// }

// taskDetails is the object that is submitted, when you click 'Edit Task' -> *form appears with fields populated* -> click 'OK'
// export const editedTask = (taskDetails) => async (dispatch) => {
//   const {content, taskId} = taskDetails;
//   const response = await fetch("/api/task", {
//     method: "PATCH",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			content,
//       taskId
// 		}),
//   })

// 	const data = await response.json();
// 	if (data.errors) return data;
// 	dispatch(editTask(data.task));
// 	return data;
// }

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
