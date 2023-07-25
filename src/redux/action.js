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

export const setCourse = (course) => (dispatch) => {
  dispatch({
    type: "SET_COURSE",
    payload: {
      course,
    },
  });
};
