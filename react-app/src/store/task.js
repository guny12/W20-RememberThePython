const ADD_TASK = "task/ADD_TASK";
const EDIT_TASK = "task/EDIT_TASK"

const LOAD_ALL_TASKS = "task/LOAD_ALL_TASKS"
const LOAD_ONE_TASK = "task/LOAD_ONE_TASK"


const addTask = (taskObj) => ({
  type: ADD_TASK,
  taskObj
})

const editTask = (taskObj) => ({
  type: EDIT_TASK,
  taskObj
})


const loadAllTasks = (tasks) => ({
  type: LOAD_ALL_TASKS,
  tasks
})

const loadOneTask = (task) => ({
  type: LOAD_ONE_TASKS,
  task
})


// load all Tasks
export const getTasks = () => async dispatch => {
  const response = await fetch('/api/task');

  if (response.ok) {
    const tasks = await response.json();
    dispatch(loadAllTasks(tasks));
  }
}

// load single Task 
export const getTask = (taskId) => async dispatch => {
  const response = await fetch(`/api/task/${taskId}`);

  if (response.ok) {
    const task = await response.json();
    dispatch(loadOneTask(task));
  }
}


export const newTask = (taskDetails) => async (dispatch) => {
  const { listId, content} = taskDetails;
  const response = await fetch("/api/task", {
    method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			listId,
			content,
		}),
  })
	const data = await response.json();
	if (data.errors) return data;
	dispatch(addTask(data.task));
	return data;
}

// taskDetails is the object that is submitted, when you click 'Edit Task' -> *form appears with fields populated* -> click 'OK'
export const editedTask = (taskDetails) => async (dispatch) => {
  const {content, taskId} = taskDetails;
  const response = await fetch("/api/task", {
    method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			content,
      taskId
		}),
  })
  
	const data = await response.json();
	if (data.errors) return data;
	dispatch(editTask(data.task));
	return data;
}

// for deletetask?
export const removedTask = (taskId) => async (dispatch) => {

  const response = await fetch("/api/task/", {
    method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
      taskId
		}),
  })
  
	const data = await response.json();
	if (data.errors) return data;
	dispatch(editTask(data.task));
	return data;
}






const initialState = { };

const taskReducer = (state = initialState, action) => {
	switch (action.type) {
    // check with rest of the group regarding State
		case ADD_TASK:
      newState = Object.assign({}, state)
      listId = action.taskObj.listId
      taskId = action.taskObj.id
      newState.listId.taskId = action.taskObj
      return newState
		case EDIT_TASK:
      newState = Object.assign({}, state)
      listId = action.taskObj.listId
      taskId = action.taskObj.id
      newState.listId.taskId = action.taskObj
      return newState
		case REMOVE_TASK:
      newState = Object.assign({}, state)
      listId = action.taskObj.listId
      taskId = action.taskObj.id
      delete newState.listId.taskId
      return newState
    case LOAD_TASKS:

		default:
			return state;
	}
};

export default taskReducer;
