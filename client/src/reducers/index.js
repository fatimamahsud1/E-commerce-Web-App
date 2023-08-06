import { combineReducers } from "redux";
import { useReducer } from "react";


const rootReducer = combineReducers({
    user : useReducer,
});

export default rootReducer;