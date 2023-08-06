import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Dropdown, ButtonGroup, Button } from "react-bootstrap";
import {
  setQuizStartWithTranslation,
  setQuizAutomaticCheck,
} from "../redux/action";

const QuizConfiguration = ({
  vocabularyCount,
  quizStartWithTranslation,
  setQuizStartWithTranslation,
  quizAutomaticCheck,
  setQuizAutomaticCheck,
  setPrepared,
}) => {
  // -2: not counting down; -1: state to transition to quiz; 0: Go!; 1-3: seconds remaining
  const [countdownSecond, setCountdownSecond] = useState(-2);

  useEffect(() => {
    if (countdownSecond === -1) {
      setPrepared(true);
    }
  }, [countdownSecond]);

  if (vocabularyCount === 0) {
    return (
      <div className="quiz-container d-flex">
        <span>No vocabulary found. Please select lessons to start.</span>
      </div>
    );
  }

  if (countdownSecond >= 0) {
    return (
      <div className="quiz-container d-flex">
        <span className="quiz-configuration-count-down-timer">
          {countdownSecond === 0 ? "Go!" : countdownSecond}
        </span>
      </div>
    );
  } else if (countdownSecond === -1) {
    return <></>;
  }

  return (
    <div className="quiz-container d-flex">
      <div>
        <p>
          Entries found: <b>{vocabularyCount}</b>. Configure your settings
          below:
        </p>
        <table className="quiz-configuration-table">
          <tbody>
            <tr>
              <td>
                <Form.Label>1st hint:</Form.Label>
              </td>
              <td>
                <Dropdown as={ButtonGroup} className="quiz-dropdown">
                  <Button variant="light">
                    {quizStartWithTranslation ? "Translation" : "Pronunciation"}
                  </Button>
                  <Dropdown.Toggle
                    split
                    variant="light"
                    id="dropdown-split-basic"
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => setQuizStartWithTranslation(true)}
                    >
                      Translation
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setQuizStartWithTranslation(false)}
                    >
                      Pronunciation
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>2nd hint:</Form.Label>
              </td>
              <td>
                <Button variant="light">Number of characters</Button>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>3rd hint:</Form.Label>
              </td>
              <td>
                <Dropdown as={ButtonGroup} className="quiz-dropdown">
                  <Button variant="light">
                    {quizStartWithTranslation ? "Pronunciation" : "Translation"}
                  </Button>
                </Dropdown>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>Check Mode:</Form.Label>
              </td>
              <td>
                <Dropdown as={ButtonGroup} className="quiz-dropdown">
                  <Button variant="light">
                    {quizAutomaticCheck ? "By System" : "Manual"}
                  </Button>
                  <Dropdown.Toggle
                    split
                    variant="light"
                    id="dropdown-split-basic"
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setQuizAutomaticCheck(true)}>
                      By System
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setQuizAutomaticCheck(false)}>
                      Manual
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex">
          <Button
            className="quiz-start-button"
            size="lg"
            onClick={() => {
              setCountdownSecond(3);
              const interval = setInterval(() => {
                setCountdownSecond((prevCountdownSecond) => {
                  if (prevCountdownSecond === 0) {
                    clearInterval(interval);
                  }
                  return prevCountdownSecond - 1;
                });
              }, 1000);
            }}
          >
            Start the Quiz!
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    vocabularyCount: state.quiz.lessonIndices.reduce(
      (sum, inQuiz, index) =>
        inQuiz
          ? sum +
              state.coursesInfoMap[state.course][index].vocabulary?.length ?? 0
          : sum,
      0
    ),
    lessons: state.coursesInfoMap[state.course],
    quizStartWithTranslation: state.quiz.startWithTranslation,
    quizAutomaticCheck: state.quiz.automaticCheck,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setQuizStartWithTranslation: (quizStartWithTranslation) =>
    dispatch(setQuizStartWithTranslation(quizStartWithTranslation)),
  setQuizAutomaticCheck: (quizAutomaticCheck) =>
    dispatch(setQuizAutomaticCheck(quizAutomaticCheck)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizConfiguration);
