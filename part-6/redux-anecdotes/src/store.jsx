import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/FilterReducer";
import notificationReducer from "./reducers/notificationReducer";

//store provided by toolkit
const store = configureStore({
 reducer :{
  anecdotes: reducer,
  filter: filterReducer,
  notification:notificationReducer
 }
})

export default store;