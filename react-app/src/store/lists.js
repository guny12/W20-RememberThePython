const ALL_LISTS = "lists/ALL_LISTS";
const GET_LIST_LENGTH = "lists/GET_LIST_LENGTH";

const loadAll = (lists) => ({
	type: ALL_LISTS,
	lists,
});

// repurposed for getting current list's length (or # of tasks)
const getListLength = (length) => ({
	type: GET_LIST_LENGTH,
	length,
});

export const getAllLists = () => async (dispatch) => {
	const res = await fetch("/api/lists/");

	const lists = await res.json();
	dispatch(loadAll(lists.lists));
	return lists.lists;
};

export const createList = (newList) => async (dispatch) => {
	const { title, userId } = newList;
	const res = await fetch("/api/lists/", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ title, userId }),
	});
	const newLi = await res.json();
	// dispatch(getAllLists());
	return newLi;
};

export const editList = (editedList) => async (dispatch) => {
	const { title, listId } = editedList;
	const res = await fetch(`/api/lists/`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			title,
			listId,
		}),
	});

	const list = await res.json();
	// dispatch(getAllLists());
	return list;
};

export const deleteList = (list) => async (dispatch) => {
	const { listId } = list;
	const res = await fetch(`/api/lists/`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			listId,
		}),
	});
	const deletedList = await res.json();
	// dispatch(getAllLists());
	return deletedList;
};

export const getListTaskIds = (listId) => async (dispatch) => {
	const res = await fetch(`/api/lists/${listId}`);
	const data = await res.json();
	dispatch(getListLength(data.length));
};

const initialState = { allLists: [], currentListTasks: {} };

const listsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ALL_LISTS:
			return { ...state, allLists: action.lists };
		case GET_LIST_LENGTH:
			return { ...state, currentListTasks: action.length };
		default:
			return state;
	}
};

export default listsReducer;
