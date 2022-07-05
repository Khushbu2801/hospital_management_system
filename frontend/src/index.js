import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Store";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";

ReactDOM.render(
	<Provider store={store}>
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	</Provider>,
	document.getElementById("root")
);



