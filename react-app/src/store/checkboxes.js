const PRIMARY_CHECKBOX = "checkboxes/PRIMARY_CHECKBOX";
const RESET_STATE = "checkboxes/RESET_STATE";

export const primaryCheckbox = (listId) => ({
  type: PRIMARY_CHECKBOX,
  payload: listId
});

export const resetCheckboxState = () => ({
  type: RESET_STATE
});

const initialState = {
  parentCheckbox: { checked: false, indeterminate: false, currentListId: null }
};

const checkboxesReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case PRIMARY_CHECKBOX:
      newState = Object.assign({}, state);
      newState.parentCheckbox.checked = !state.parentCheckbox.checked;
      newState.parentCheckbox.currentListId = parseInt(action.payload, 10);

      return newState;
    case RESET_STATE:
      return { parentCheckbox: { checked: false, indeterminate: false, currentListId: null } };
    default:
      return state;
  }
};

export default checkboxesReducer;
