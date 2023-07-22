export const setTab = (tab) => (dispatch) => {
  dispatch({
    type: "SET_TAB",
    payload: {
      tab,
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