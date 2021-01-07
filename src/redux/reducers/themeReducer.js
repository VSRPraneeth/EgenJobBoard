import { TOGGLE_THEME } from "../types";

const initialState = {
  light: true,
};

const themeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_THEME:
      return { ...state, light: !state.light };
    default:
      return state;
  }
};

export default themeReducer;
