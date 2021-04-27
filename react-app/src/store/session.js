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
export const login = (user) => async (dispatch) => {
	const { credential, password } = user;
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			credential,
			password,
		}),
	});
	console.log(response, "RESPONSE HERE -----------------------------------");
	const data = await response.json();
	console.log(data, "PARSED DATA HERE-------------------------------------");
	if (data.errors) return data;
	dispatch(setSessionUser(data));
	return data;
};

export const restoreUser = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	if (data.errors) return;
	dispatch(setSessionUser(data));
};

export const signUp = (user) => async (dispatch) => {
	const { username, email, password, firstName, lastName } = user;
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, email, password, firstName, lastName }),
	});
	const data = await response.json();
	if (data.errors) return data;
	dispatch(setSessionUser(data));
	return data;
};

export const logout = () => async (dispatch) => {
	await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	dispatch(removeSessionUser());
};

// reducer
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SESSION:
			console.log("TEST");
			return { user: action.user };
		case REMOVE_SESSION:
			return { user: null };
		default:
			return state;
	}
};

export default sessionReducer;
