import { FILTER_POSITIONS } from "../types";

const initialState = {
  filterJob: "",
  filterLocation: "",
  fullTime: false,
  filterLatLong: {
    lat: null,
    long: null,
  },
};

const filterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FILTER_POSITIONS:
      let finalState = { ...state };
      if (payload) {
        if (payload.filterJob) {
          finalState.filterJob = payload.filterJob;
        }
        if (payload.filterLocation) {
          finalState.filterLocation = payload.filterLocation;
        }
        if (payload.fullTime !== null) {
          finalState.fullTime = payload.fullTime;
        }
        if (payload.filterLatLong) {
          finalState.filterLatLong = { ...payload.filterLatLong };
        }
      }
      return { ...finalState };
    default:
      return state;
  }
};

export default filterReducer;
