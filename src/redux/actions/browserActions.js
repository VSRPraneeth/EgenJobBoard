import { LOCATION_ON, MOBILE_BROWSER } from "../types";

// mobile / PC
export const mobileActions = (isMobile) => {
  return {
    type: MOBILE_BROWSER,
    payload: isMobile,
  };
};

// Enabling and disabling location
export const locationActions = (locationOn) => {
  return {
    type: LOCATION_ON,
    payload: locationOn,
  };
};
