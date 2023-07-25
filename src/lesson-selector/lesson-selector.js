import React from "react";
import "./lesson-selector.css";
import { connect } from "react-redux";
import { setLessonIndexAndTime } from "../redux/action";

const LessonSelector = ({ lessons, lessonIndex, setLessonIndexAndTime }) => {
  return (
    <div
      id="lesson-selector"
      role="dialog"
      className="cart-offcanvas offcanvas offcanvas-end show"
    >
      <div>Lessons</div>
      {lessons.map(({ name, time }, index) => (
        <p
          key={`lesson-${index}`}
          title={name}
          className={lessonIndex === index ? "selected" : ""}
          onClick={() => {
            if (lessonIndex !== index) {
              setLessonIndexAndTime(index, time);
            }
          }}
        >
          {name}
        </p>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  lessonIndex: state.lessonIndex,
  lessons: state.coursesInfoMap[state.course],
});

const mapDispatchToProps = (dispatch) => ({
  setLessonIndexAndTime: (lesson, time) =>
    dispatch(setLessonIndexAndTime(lesson, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonSelector);
