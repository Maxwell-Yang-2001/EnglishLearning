import React from "react";
import "./lesson-selector.css";
import { connect } from "react-redux";
import { setLesson, setTime } from "../redux/action";

const LessonSelector = ({ timestamps, lesson, setLesson, setTime }) => {
  return (
    <div id="lesson-selector" role="dialog" className="cart-offcanvas offcanvas offcanvas-end show">
      <div>Lessons</div>
      {timestamps.map(({ time, part }, index) => (
        <p
          key={`lesson-${index}`}
          className={lesson === index ? "selected" : ""}
          onClick={() => {
            if (lesson !== index) {
              setLesson(index);
              setTime(time);
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
  timestamps: state.timestamps,
});

const mapDispatchToProps = (dispatch) => ({
  setLesson: (lesson) => dispatch(setLesson(lesson)),
  setTime: (time) => dispatch(setTime(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonSelector);
