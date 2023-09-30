import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import * as Reducers from "./Reducers";

const reducer = (state = {}, action) => {
  try {
    return Reducers[action.type](state, action);
  } catch (err) {
    console.error(err);
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default {
  ...store,
};
