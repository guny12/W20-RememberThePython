import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import listsReducer from "./lists";
import searchReducer from "./search";
import taskReducer from "./tasks";
import checkboxesReducer from "./checkboxes";
import modalsReducer from "./modals";

const rootReducer = combineReducers({
	session: sessionReducer,
	lists: listsReducer,
	search: searchReducer,
	tasks: taskReducer,
	checkboxes: checkboxesReducer,
	modals: modalsReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
