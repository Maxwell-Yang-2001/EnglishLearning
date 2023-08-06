import React, { useState } from "react";
import "./quiz.css";
import { connect } from "react-redux";
import { Form, Dropdown, ButtonGroup, Button } from "react-bootstrap";
import {
  setQuizStartWithTranslation,
  setQuizAutomaticCheck,
} from "../redux/action";

const Quiz = ({
  vocabulary,
  quizStartWithTranslation,
  setQuizStartWithTranslation,
  quizAutomaticCheck,
  setQuizAutomaticCheck,
}) => {
  const [prepared, setPrepared] = useState(false);

  if (vocabulary.length === 0) {
    return (
      <div className="quiz-container d-flex">
        <span>No vocabulary found. Please select lessons to start.</span>
      </div>
    );
  }

  if (!prepared) {
    return (
      <div className="quiz-container d-flex">
        <div>
          <p>
            Entries found: <b>{vocabulary.length}</b>. Configure your settings
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
                      {quizStartWithTranslation
                        ? "Translation"
                        : "Pronunciation"}
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
                      {quizStartWithTranslation
                        ? "Pronunciation"
                        : "Translation"}
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
                      <Dropdown.Item
                        onClick={() => setQuizAutomaticCheck(true)}
                      >
                        By System
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setQuizAutomaticCheck(false)}
                      >
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
              onClick={() => setPrepared(true)}
            >
              Start the Quiz!
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <></>;
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

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
