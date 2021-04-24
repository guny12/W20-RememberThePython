import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ModalProvider } from "./context/Modal";
import configureStore from "./store";
import { authenticate } from "./services/auth";

import * as sessionActions from "./store/session";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
	authenticate();

	window.store = store;
	window.sessionActions = sessionActions;
}

function Root() {
	return (
		<ReduxProvider store={store}>
			<ModalProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ModalProvider>
		</ReduxProvider>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById("root")
);
