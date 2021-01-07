import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import jobsReducer from "./reducers/jobsReducer";
import themeReducer from "./reducers/themeReducer";
import filterReducer from "./reducers/filterReducer";
import browserReducer from "./reducers/browserReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  jobs: jobsReducer,
  theme: themeReducer,
  filter: filterReducer,
  browser: browserReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
