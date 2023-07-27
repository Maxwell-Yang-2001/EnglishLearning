import React from "react";
import "./vocabulary-list.css";
import { connect } from "react-redux";
import { setLessonIndexAndTime } from "../redux/action";

const VocabularyList = ({ vocabulary }) => {
  if (!vocabulary) {
    return <span>No vocabulary found for selected lesson.</span>;
  }
  return (
    <div>
      {vocabulary.map(({ word }, index) => (
        <p key={`vocabulary-entry-${index}`}>{word}</p>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  vocabulary:
    state.coursesInfoMap[state.course][state.lessonIndex]["vocabulary"],
});

const mapDispatchToProps = (dispatch) => ({
  setLessonIndexAndTime: (lesson, time) =>
    dispatch(setLessonIndexAndTime(lesson, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabularyList);
