import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer from "./Reducer/rootReducer";

//  redux middlewares
const middlewares = [thunk];

if(process.env.NODE_ENV === "development"){
    const { logger } = require ("redux-logger");

    middlewares.push(logger);
}


  
const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;