import React, { useState } from "react";
import LessonSelector from "../../lesson-selector/lesson-selector";
import Quiz from "../../quiz/quiz";
import QuizConfiguration from "../../quiz/quiz-configuration";

export const QuizPage = () => {
  const [prepared, setPrepared] = useState(false);
  return (
    <>
      {prepared ? <Quiz setPrepared={setPrepared} /> : <QuizConfiguration setPrepared={setPrepared} />}
      <LessonSelector quizPrepared={prepared} />
    </>
  );
};
