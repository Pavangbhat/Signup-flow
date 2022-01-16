import { createStore } from "redux";
import errorReducer from "./error/errorReducer";

const store = createStore(errorReducer);

export default store;
