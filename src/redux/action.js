export const setTab = (tab) => (dispatch) => {
  dispatch({
    type: "SET_TAB",
    payload: {
      tab,
    },
  });
};

export const setLessonAndTime = (lesson, time) => (dispatch) => {
  dispatch({
    type: "SET_LESSON_AND_TIME",
    payload: {
      lesson,
      time,
    },
  });
};

export const setLesson = (lesson) => (dispatch) => {
  dispatch({
    type: "SET_LESSON",
    payload: {
      lesson,
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
