import { defaultState } from "./state";

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case "SET_TAB":
    case "SET_LESSON":
    case "SET_TIME":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
