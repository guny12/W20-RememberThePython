const SEARCH = "session/SEARCH"

const getSearch = (results) => ({
  type: SEARCH,
  results
});

export const searchQuery = (query) => async (dispatch) => {
  const response = await fetch(`/api/search/${query}`);
  const data = await response.json();
  dispatch(getSearch(data.results));
  return data;
};

const initialState = { results: null };

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return { results: action.results };
    default:
      return state;
  }
};

export default searchReducer;
