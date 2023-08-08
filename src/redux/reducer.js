import { defaultState } from "./state";

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case "SET_TAB":
    case "SET_LESSON_INDEX":
    case "SET_TIME":
    case "SET_LESSON_INDEX_AND_TIME":
    case "SET_VOCABULARY_PLAYBACK_RATE":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_COURSE":
      return {
        ...action.payload,
        tab: state.tab,
        coursesInfoMap: state.coursesInfoMap,
        vocabularyPlaybackRate: state.vocabularyPlaybackRate,
        quiz: {
          ...state.quiz,
          lessonIndices: Array(
            state.coursesInfoMap[action.payload.course].length
          ).fill(false),
        },
        lessonIndex: 0,
        time: 0,
      };
    case "TOGGLE_QUIZ_LESSON_INDEX": {
      const quizLessonIndices = [...state.quiz.lessonIndices];
      quizLessonIndices[action.payload.quizLessonIndex] =
        !quizLessonIndices[action.payload.quizLessonIndex];
      return {
        ...state,
        quiz: {
          ...state.quiz,
          lessonIndices: quizLessonIndices,
        },
      };
    }
    case "FILL_QUIZ_LESSON_INDEX_RANGE": {
      const quizLessonIndices = [...state.quiz.lessonIndices];
      for (let i = action.payload.start; i <= action.payload.end; i++) {
        quizLessonIndices[i] = true;
      }
      return {
        ...state,
        quiz: {
          ...state.quiz,
          lessonIndices: quizLessonIndices,
        },
      };
    }
    case "CLEAR_QUIZ_LESSON_INDICES":
      return {
        ...state,
        quiz: {
          ...state.quiz,
          lessonIndices: Array(state.coursesInfoMap[state.course].length).fill(
            false
          ),
        },
      };
    case "SET_QUIZ_START_WITH_TRANSLATION":
      return {
        ...state,
        quiz: {
          ...state.quiz,
          startWithTranslation: action.payload.quizStartWithTranslation,
        },
      };
    default:
      return state;
  }
}
