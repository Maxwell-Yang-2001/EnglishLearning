import React from "react";
import "./lesson-selector.css";
import { connect } from "react-redux";
import { setLessonAndTime } from "../redux/action";

const LessonSelector = ({ timestamps, lesson, setLessonAndTime }) => {
  return (
    <div
      id="lesson-selector"
      role="dialog"
      className="cart-offcanvas offcanvas offcanvas-end show"
    >
      <div>Lessons</div>
      {timestamps.map(({ time, part }, index) => (
        <p
          key={`lesson-${index}`}
          className={lesson === index ? "selected" : ""}
          onClick={() => {
            if (lesson !== index) {
              setLessonAndTime(index, time);
            }
          }}
        >
          {part}
        </p>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  lesson: state.lesson,
  timestamps: state.timestampsMap[state.course],
});

const mapDispatchToProps = (dispatch) => ({
  setLessonAndTime: (lesson, time) => dispatch(setLessonAndTime(lesson, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonSelector);
