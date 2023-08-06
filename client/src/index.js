import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
// import "antd/dist/antd.css";
import "antd/dist/reset.css"
import {createStore} from "redux"
import {Provider} from "react-redux"
import {composeWithDevTools} from "redux-devtools-extension"
import rootReducer from './reducers/index.js';

const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);