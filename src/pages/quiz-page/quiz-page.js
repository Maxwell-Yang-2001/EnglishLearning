import React from "react";
import "./quiz-page.css";
import LessonSelector from "../../lesson-selector/lesson-selector";
import Quiz from "../../quiz/quiz";

export const QuizPage = () => (
  <>
    <Quiz />
    <LessonSelector />
  </>
);
