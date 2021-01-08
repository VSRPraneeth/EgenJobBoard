import { LOCATION_ON, MOBILE_BROWSER } from "../../types";
import { locationActions, mobileActions } from "../browserActions";

describe("Browser Actions", () => {
  describe("Mobile Actions ", () => {
    it("should set payload to the passed value and type as MOBILE_BROWSER", () => {
      const isMobile = true;
      const expectedAction = { type: MOBILE_BROWSER, payload: true };
      expect(mobileActions(isMobile)).toEqual(expectedAction);
    });
  });

  describe("Location Actions ", () => {
    it("should set payload to the passed value and type as LOCATION_ON", () => {
      const locationOn = true;
      const expectedAction = { type: LOCATION_ON, payload: true };
      expect(locationActions(locationOn)).toEqual(expectedAction);
    });
  });
});
