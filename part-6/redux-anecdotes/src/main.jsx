import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import reducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/FilterReducer";

const reducers = combineReducers({
  anecdotes: reducer,
  filter: filterReducer,
});
//creating store for store the state by passing the reducer
const store = createStore(reducers);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
