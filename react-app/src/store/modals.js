const SHOW_PROFILE_MENU = "modals/SHOW_PROFILE_MENU";
const HIDE_PROFILE_MENU = "modals/HIDE_PROFILE_MENU";

export const showProfileMenu = () => ({
  type: SHOW_PROFILE_MENU
});

export const hideProfileMenu = () => ({
  type: HIDE_PROFILE_MENU
});

const initialState = {
  profileMenu: false
};

const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PROFILE_MENU:
      return { ...state, profileMenu: true };
    case HIDE_PROFILE_MENU:
      return { ...state, profileMenu: false };
    default:
      return state;
  }
};

export default modalsReducer;
