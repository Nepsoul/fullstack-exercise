import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/FilterReducer";

//store provided by toolkit
const store = configureStore({
 reducer :{
  anecdotes: reducer,
  filter: filterReducer,
 }
})

export default store;