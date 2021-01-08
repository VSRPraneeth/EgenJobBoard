import checkPropTypes from "check-prop-types";
import { createStore, applyMiddleware, combineReducers } from "redux";
import jobsReducer from "../redux/reducers/jobsReducer";
import themeReducer from "../redux/reducers/themeReducer";
import filterReducer from "../redux/reducers/filterReducer";
import browserReducer from "../redux/reducers/browserReducer";
import thunk from "redux-thunk";

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name
  );
  return propsErr;
};

const middleware = [thunk];

const reducers = combineReducers({
  jobs: jobsReducer,
  theme: themeReducer,
  filter: filterReducer,
  browser: browserReducer,
});

export const testStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(reducers, initialState);
};
