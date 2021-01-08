import { FILTER_POSITIONS } from "../../types";
import filterReducer from "../filterReducer";

describe("Filter Reducer ", () => {
  let initialState = {};
  beforeEach(() => {
    initialState = {
      filterJob: "",
      filterLocation: "",
      fullTime: false,
      filterLatLong: {
        lat: null,
        long: null,
      },
    };
  });
  it("should return default state", () => {
    expect(filterReducer(undefined, {})).toEqual(initialState);
  });

  it("should set state values to passed input values for filter positions type", () => {
    const payload = {
      filterJob: "Engineer",
      filterLocation: "NewYork",
      fullTime: false,
      filterLatLong: {
        lat: 23.3435353,
        long: 45.435435,
      },
    };
    const action = { type: FILTER_POSITIONS, payload: payload };
    expect(filterReducer(initialState, action)).toEqual(payload);
  });
});
