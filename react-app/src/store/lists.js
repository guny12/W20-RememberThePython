const ALL_LISTS = "lists/ALL_LISTS";
const GET_LIST = "lists/GET_LIST";

const loadAll = (lists) => ({
	type: ALL_LISTS,
	lists,
});

// what is this for? there's no GET_LIST action in reducer. same for where this is dispatched -Jim
const loadOne = (list) => ({
	type: GET_LIST,
	list,
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
	dispatch(loadOne(newLi));
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
	dispatch(loadOne(list));
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
	dispatch(loadOne(deletedList));
	return deletedList;
};

const listsReducer = (state = {}, action) => {
	switch (action.type) {
		case ALL_LISTS:
			return { ...state, allLists: action.lists };
		default:
			return state;
	}
};

export default listsReducer;
