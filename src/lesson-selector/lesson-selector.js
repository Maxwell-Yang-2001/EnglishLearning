import React, { useState } from "react";
import "./lesson-selector.css";
import { connect } from "react-redux";
import {
  clearQuizLessonIndices,
  fillQuizLessonIndexRange,
  setLessonIndexAndTime,
  toggleQuizLessonIndex,
} from "../redux/action";

const XCircle = ({ clearQuizLessonIndices }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-x-circle-fill clear-button"
    viewBox="0 0 16 16"
    onClick={() => clearQuizLessonIndices()}
  >
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
  </svg>
);

const SelectBox = ({ selectOn }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-bounding-box-circles select-button"
    viewBox="0 0 16 16"
    onClick={selectOn}
  >
    <path d="M2 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM0 2a2 2 0 0 1 3.937-.5h8.126A2 2 0 1 1 14.5 3.937v8.126a2 2 0 1 1-2.437 2.437H3.937A2 2 0 1 1 1.5 12.063V3.937A2 2 0 0 1 0 2zm2.5 1.937v8.126c.703.18 1.256.734 1.437 1.437h8.126a2.004 2.004 0 0 1 1.437-1.437V3.937A2.004 2.004 0 0 1 12.063 2.5H3.937A2.004 2.004 0 0 1 2.5 3.937zM14 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM2 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
  </svg>
);

const LessonSelector = ({
  lessons,
  lessonIndex,
  setLessonIndexAndTime,
  isQuiz,
  quizLessonIndices,
  toggleQuizLessonIndex,
  clearQuizLessonIndices,
  fillQuizLessonIndexRange,
}) => {
  // selectIndex: -2 not in select mode; -1 in select mode; 0+ in select mode with selection
  const [selectIndex, setSelectIndex] = useState(-2);
  return (
    <div
      id="lesson-selector"
      role="dialog"
      className="cart-offcanvas offcanvas offcanvas-end show"
    >
      <div>
        Lessons
        {isQuiz && selectIndex === -2 && (
          <SelectBox selectOn={() => setSelectIndex(-1)} />
        )}
        {isQuiz && selectIndex === -2 && quizLessonIndices.indexOf(true) !== -1 && (
          <XCircle clearQuizLessonIndices={clearQuizLessonIndices} />
        )}
      </div>
      {lessons.map(({ name, time }, index) => (
        <p
          key={`lesson-${index}`}
          title={name}
          className={
            isQuiz
              ? `quiz-lesson-tile${quizLessonIndices[index] || index === selectIndex ? " selected" : ""}`
              : lessonIndex === index
              ? "selected"
              : ""
          }
          onClick={() => {
            if (isQuiz) {
              if (selectIndex === -2) {
                // not in select mode - regular toggle
                toggleQuizLessonIndex(index);
              } else if (selectIndex === -1) {
                // in select mode - set select index
                setSelectIndex(index);
              } else {
                // in select mode with existing index - fill the range and clear select index
                fillQuizLessonIndexRange(Math.min(index, selectIndex), Math.max(index, selectIndex));
                setSelectIndex(-2);
              }
            } else {
              if (lessonIndex !== index) {
                setLessonIndexAndTime(index, time);
              }
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
  isQuiz: state.tab === 2,
  quizLessonIndices: state.quiz.lessonIndices,
});

const mapDispatchToProps = (dispatch) => ({
  setLessonIndexAndTime: (lesson, time) =>
    dispatch(setLessonIndexAndTime(lesson, time)),
  toggleQuizLessonIndex: (quizLessonIndex) =>
    dispatch(toggleQuizLessonIndex(quizLessonIndex)),
  clearQuizLessonIndices: () => dispatch(clearQuizLessonIndices()),
  fillQuizLessonIndexRange: (start, end) =>
    dispatch(fillQuizLessonIndexRange(start, end)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonSelector);
