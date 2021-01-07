import { MOBILE_BROWSER, LOCATION_ON } from "../types";

const initialState = {
  isMobile: false,
  locationOn: false,
};

const browserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MOBILE_BROWSER:
      return { ...state, isMobile: payload };
    case LOCATION_ON:
      return { ...state, locationOn: payload };
    default:
      return state;
  }
};

export default browserReducer;
