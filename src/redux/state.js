const timestampsMap = require("../data/timestamps.json");

export const defaultState = {
  tab: 0,
  course: Object.keys(timestampsMap)[0],
  lesson: 0,
  time: 0,
  timestampsMap,
};
