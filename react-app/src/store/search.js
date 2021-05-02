const SEARCH = "session/SEARCH";
const CLEAR_SEARCH = "session/CLEAR_SEARCH";

const getSearch = (results) => ({
	type: SEARCH,
	results,
});

const clearSearch = () => ({
	type: CLEAR_SEARCH,
});

export const searchQuery = (query) => async (dispatch) => {
	const response = await fetch(`/api/search/${query}`);
	const data = await response.json();
	dispatch(getSearch(data.results));
	return data;
};

export const searchDateQuery = (query) => async (dispatch) => {
	const response = await fetch(`/api/search/date/${query}`);
	const data = await response.json();
	dispatch(getSearch(data.results));
	return data;
};

export const clearAllResults = () => async (dispatch) => {
	dispatch(clearSearch());
};

const initialState = { results: null };

const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEARCH:
			return { results: action.results };
		case CLEAR_SEARCH:
			return initialState;
		default:
			return state;
	}
};

export default searchReducer;
