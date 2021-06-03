const CHECK_MAIN_CHECKBOX = "checkboxes/CHECK_MAIN_CHECKBOX";
const UNCHECK_MAIN_CHECKBOX = "checkboxes/UNCHECK_MAIN_CHECKBOX";
const INDETERMINATE_MAIN_CHECKBOX = "checkboxes/INDETERMINATE_MAIN_CHECKBOX";
const RESET_STATE = "checkboxes/RESET_STATE";

export const checkMainCheckbox = (listId) => ({
  type: CHECK_MAIN_CHECKBOX,
  payload: listId
});

export const uncheckMainCheckbox = (listId) => ({
  type: UNCHECK_MAIN_CHECKBOX,
  payload: listId
});

export const indeterminateMainCheckbox = (listId) => ({
  type: INDETERMINATE_MAIN_CHECKBOX,
  payload: listId
});

export const resetCheckboxState = () => ({
  type: RESET_STATE
});

const initialState = {
  parentCheckbox: {
    checked: false,
    indeterminate: false,
    currentListId: null
  }
};

const checkboxesReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CHECK_MAIN_CHECKBOX:
      newState = Object.assign({}, state);
      newState.parentCheckbox.checked = true;
      newState.parentCheckbox.indeterminate = false;
      newState.parentCheckbox.currentListId = parseInt(action.payload, 10);

      return newState;
    case UNCHECK_MAIN_CHECKBOX:
      newState = Object.assign({}, state);
      newState.parentCheckbox.checked = false;
      newState.parentCheckbox.indeterminate = false;
      newState.parentCheckbox.currentListId = parseInt(action.payload, 10);

      return newState;
    case INDETERMINATE_MAIN_CHECKBOX:
      newState = Object.assign({}, state);
      newState.parentCheckbox.checked = false;
      newState.parentCheckbox.indeterminate = true;
      newState.parentCheckbox.currentListId = parseInt(action.payload, 10);

      return newState;
    case RESET_STATE:
      return { parentCheckbox: { checked: false, indeterminate: false, currentListId: null } };
    default:
      return state;
  }
};

export default checkboxesReducer;
