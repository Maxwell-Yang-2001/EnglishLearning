const coursesInfoMap = require("../data/coursesInfo.json");

export const defaultState = {
  tab: 0,
  course: Object.keys(coursesInfoMap)[0],
  lessonIndex: 0,
  vocabularyPlaybackRate: 1,
  time: 0,
  coursesInfoMap,
};
