import { signUp, logout, login } from "../services/auth";

//action type variables
const SET_SESSION = "session/SET_SESSION";
const REMOVE_SESSION = "session/REMOVE_SESSION";

// action creators
const removeSessionUser = () => ({
	type: REMOVE_SESSION,
});

const setSessionUser = (user) => ({
	type: SET_SESSION,
	user,
});

// thunk action creators
export const loginThunk = (user) => async (dispatch) => {
	const { credential, password } = user;
	const response = await login(credential, password);
	const data = await response.json();
	dispatch(setSessionUser(data.user));
	return response;
};

export const restoreUser = () => async (dispatch) => {
	const response = await fetch("/api/session");
	const data = await response.json();
	dispatch(setSessionUser(data.user));
	return response;
};

export const signUpThunk = (user) => async (dispatch) => {
	const { username, email, password, firstName, lastName } = user;
	const response = await signUp(username, email, password, firstName, lastName);
	const data = await response.json();
	dispatch(setSessionUser(data.user));
	return response;
};

export const logoutThunk = () => async (dispatch) => {
	const response = await logout();
	dispatch(removeSessionUser());
	return response;
};

// reducer
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_SESSION:
			newState = Object.assign({}, state);
			newState.user = action.user ? action.user : null;
			return newState;
		case REMOVE_SESSION:
			newState = Object.assign({}, state);
			newState.user = null;
			return newState;
		default:
			return state;
	}
};

export default sessionReducer;
