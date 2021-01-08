import { MOBILE_BROWSER, LOCATION_ON } from "../../types";
import browserReducer from "../browserReducer";

describe("Browser Reducer ", () => {
  it("should return default state", () => {
    const initialState = { isMobile: false, locationOn: true };
    expect(browserReducer(undefined, {})).toEqual(initialState);
  });

  it("should set isMobile to true for mobile Brower Action Type having payload true", () => {
    const initialState = { isMobile: false, locationOn: false };
    const expectedState = { isMobile: true, locationOn: false };
    const action = { type: MOBILE_BROWSER, payload: true };
    expect(browserReducer(initialState, action)).toEqual(expectedState);
  });

  it("should set isMobile to false for mobile Brower Action Type having payload false", () => {
    const initialState = { isMobile: undefined, locationOn: false };
    const expectedState = { isMobile: false, locationOn: false };
    const action = { type: MOBILE_BROWSER, payload: false };
    expect(browserReducer(initialState, action)).toEqual(expectedState);
  });

  it("should set locationOn to true when location is turned on", () => {
    const initialState = { isMobile: false, locationOn: false };
    const expectedState = { isMobile: false, locationOn: true };
    const action = { type: LOCATION_ON, payload: true };
    expect(browserReducer(initialState, action)).toEqual(expectedState);
  });

  it("should set locationOn to false when location is turned off", () => {
    const initialState = { isMobile: false, locationOn: undefined };
    const expectedState = { isMobile: false, locationOn: false };
    const action = { type: LOCATION_ON, payload: false };
    expect(browserReducer(initialState, action)).toEqual(expectedState);
  });
});
