const ALL_LISTS = "lists/ALL_LISTS";
const GET_LIST = "lists/GET_LIST";

const loadAll = (lists) => ({
  type: ALL_LISTS,
  lists,
});

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

export const editList = (editedList, listId) => async (dispatch) => {
  const res = await fetch(`/api/lists/${listId}/edit/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editedList),
  });

  const list = await res.json();
  dispatch(loadOne(list));
  return list;
};

const listsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_LISTS:
      return { ...state, allLists: action.lists };
    case GET_LIST:
      return { ...state, newList: action.list };
    default:
      return state;
  }
};

export default listsReducer;
