export const setTab = (tab) => (dispatch) => {
  dispatch({
    type: "SET_TAB",
    payload: {
      tab,
    },
  });
};

export const setLessonIndexAndTime = (lessonIndex, time) => (dispatch) => {
  dispatch({
    type: "SET_LESSON_INDEX_AND_TIME",
    payload: {
      lessonIndex,
      time,
    },
  });
};

export const setLessonIndex = (lessonIndex) => (dispatch) => {
  dispatch({
    type: "SET_LESSON_INDEX",
    payload: {
      lessonIndex,
    },
  });
};

export const setTime = (time) => (dispatch) => {
  dispatch({
    type: "SET_TIME",
    payload: {
      time,
    },
  });
};

export const setVocabularyPlaybackRate =
  (vocabularyPlaybackRate) => (dispatch) => {
    dispatch({
      type: "SET_VOCABULARY_PLAYBACK_RATE",
      payload: {
        vocabularyPlaybackRate,
      },
    });
  };

export const setCourse = (course) => (dispatch) => {
  dispatch({
    type: "SET_COURSE",
    payload: {
      course,
    },
  });
};

export const toggleQuizLessonIndex = (quizLessonIndex) => (dispatch) => {
  dispatch({
    type: "TOGGLE_QUIZ_LESSON_INDEX",
    payload: {
      quizLessonIndex,
    },
  });
};


export const clearQuizLessonIndices = () => (dispatch) => {
  dispatch({
    type: "CLEAR_QUIZ_LESSON_INDICES",
    payload: {},
  });
};

export const fillQuizLessonIndexRange = (start, end) => (dispatch) => {
  dispatch({
    type: "FILL_QUIZ_LESSON_INDEX_RANGE",
    payload: {
      start,
      end
    }
  })
};

export const setQuizStartWithTranslation = (quizStartWithTranslation) => (dispatch) => {
  dispatch({
    type: "SET_QUIZ_START_WITH_TRANSLATION",
    payload: {
      quizStartWithTranslation
    }
  })
}

export const setQuizAutomaticCheck = (quizAutomaticCheck) => (dispatch) => {
  dispatch({
    type: "SET_QUIZ_AUTOMATIC_CHECK",
    payload: {
      quizAutomaticCheck
    }
  })
}