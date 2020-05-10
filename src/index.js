import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./component/app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import registerServiceWorker from "./registerServiceWorker";
import ReduxThunk from "redux-thunk";

import "./styles.css";

let store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
