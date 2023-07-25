import { defaultState } from "./state";

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case "SET_TAB":
    case "SET_LESSON_INDEX":
    case "SET_TIME":
    case "SET_LESSON_INDEX_AND_TIME":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_COURSE":
      return {
        ...action.payload,
        tab: state.tab,
        coursesInfoMap: state.coursesInfoMap,
        lessonIndex: 0,
        time: 0,
      };
    default:
      return state;
  }
}
