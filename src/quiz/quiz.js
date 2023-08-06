import React, { useState } from "react";
import "./quiz.css";
import { connect } from "react-redux";
import { setQuizStartWithTranslation } from "../redux/action";

const Quiz = ({ vocabulary, quizStartWithTranslation, quizAutomaticCheck }) => {
  return (
    <div className="quiz-container d-flex">
      <span>Dummy quiz</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  const vocabulary = [];
  state.quiz.lessonIndices.forEach((inQuiz, index) => {
    if (!inQuiz) return;
    const lessonVocabulary =
      state.coursesInfoMap[state.course][index].vocabulary;
    if (lessonVocabulary && lessonVocabulary.length > 0) {
      vocabulary.push(...lessonVocabulary);
    }
  });
  return {
    vocabulary,
    quizStartWithTranslation: state.quiz.startWithTranslation,
    quizAutomaticCheck: state.quiz.automaticCheck,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setQuizStartWithTranslation: (quizStartWithTranslation) =>
    dispatch(setQuizStartWithTranslation(quizStartWithTranslation)), // TODO: remove
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
