const coursesInfoMap = require("../data/coursesInfo.json");

const defaultCourse = Object.keys(coursesInfoMap)[0];
export const defaultState = {
  tab: 0,
  course: defaultCourse,
  lessonIndex: 0,
  vocabularyPlaybackRate: 1,
  time: 0,
  coursesInfoMap,
  quiz: {
    lessonIndices: Array(coursesInfoMap[defaultCourse].length).fill(false),
    startWithTranslation: true
  },
};
