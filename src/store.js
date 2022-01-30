import { createStore, combineReducers } from "redux";
import { crosswords } from "./reducers/crosswords/crosswords";

const reducers = {
  crosswords
};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer);
