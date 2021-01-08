import { FILTER_POSITIONS } from "../types";

// Filter
export const filterActions = (filterItems) => {
  return {
    type: FILTER_POSITIONS,
    payload: filterItems,
  };
};
