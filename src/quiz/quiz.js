import React, { useState, useEffect, useCallback, useRef } from "react";
import "./quiz.css";
import { connect } from "react-redux";
import { setQuizStartWithTranslation } from "../redux/action";
import { playSound } from "../utils/audio";
import { Button } from "react-bootstrap";
import VocabularyList from "../vocabulary-list/vocabulary-list";

// shuffle the array randomly with Fisher-Yates algorithm
const shuffle = (inputArray) => {
  const array = [...inputArray];
  for (let curr = array.length - 1; curr > 0; curr--) {
    const rand = Math.floor(Math.random() * (curr + 1));
    if (rand !== curr) {
      const temp = array[curr];
      array[curr] = array[rand];
      array[rand] = temp;
    }
  }
  return array;
};

let quizOrder;

const Quiz = ({ vocabulary, quizStartWithTranslation }) => {
  if (!quizOrder) {
    quizOrder = shuffle(vocabulary);
  }

  const [index, setIndex] = useState(0);
  const [incorrectEntries, setIncorrectEntries] = useState([]);
  const [skipEntries, setSkipEntries] = useState([]);
  const [hintNumber, setHintNumber] = useState(0);

  return index < (quizOrder?.length ?? 0) ? (
    <div className="quiz-question-container">
      <QuizQuestion
        entry={quizOrder[index]}
        markIncorrect={(entry) => {
          setIncorrectEntries([...incorrectEntries, entry]);
        }}
        complete={() => {
          setIndex(index + 1);
        }}
        skip={(entry) => {
          setIndex(index + 1);
          setSkipEntries([...skipEntries, entry]);
        }}
        addHints={(hints) => {
          setHintNumber(hintNumber + hints);
        }}
        quizStartWithTranslation={quizStartWithTranslation}
      />
      <div className="quiz-progress-row d-flex">
        {index + 1} out of {quizOrder.length},{" "}
        {Math.round((100 * index) / quizOrder.length)}%
      </div>
    </div>
  ) : (
    <VocabularyList
      vocabulary={[
        <p className="vocabulary-list-group-title">
          Quiz Result (
          {Math.round(100 - (100 * incorrectEntries.length) / quizOrder.length)}
          %)
        </p>,
        <div>
          <p>Quiz Complete!</p>
          <p>
            Out of <b>{quizOrder.length}</b> question(s), you got{" "}
            <b>{quizOrder.length - incorrectEntries.length}</b> (
            <b>
              {Math.round(
                100 - (100 * incorrectEntries.length) / quizOrder.length
              )}
              %
            </b>
            ) correct.
          </p>
          <p>
            You skipped <b>{skipEntries.length}</b> (
            <b>{Math.round((100 * skipEntries.length) / quizOrder.length)}%</b>)
            question(s).
          </p>
          <p>
            Excluding Hint 1, You used <b>{hintNumber}</b> hint(s), which
            results in an average of{" "}
            <b>{(hintNumber / quizOrder.length).toFixed(2)}</b> hint(s) per
            question.
          </p>
        </div>,
        incorrectEntries.length > 0 && (
          <p className="vocabulary-list-group-title">Incorrect Entries</p>
        ),
        ...incorrectEntries,
        skipEntries.length > 0 && (
          <p className="vocabulary-list-group-title">Skipped Entries</p>
        ),
        ...skipEntries,
      ]}
    />
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  setQuizStartWithTranslation: (quizStartWithTranslation) =>
    dispatch(setQuizStartWithTranslation(quizStartWithTranslation)), // TODO: remove
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

const Audio = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-volume-up-fill quiz-audio"
    viewBox="0 0 16 16"
    onClick={onClick}
  >
    <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
    <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
    <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
  </svg>
);

const REGEX_SPACE = /\s/g;
const REGEX_LETTER = /[a-zA-Z]/g;
const REGEX_SPECIAL = /,|\.|!|\?|-/g;

const getOccurences = (word, regex) => {
  return (word.match(regex) || []).length;
};

const QuizQuestion = ({
  entry,
  markIncorrect,
  complete,
  skip,
  addHints,
  quizStartWithTranslation,
}) => {
  const { word, meanings } = entry;
  // 0-2: hint 1-3; 3: correct answer
  const [hintIndex, setHintIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const sound = useRef(undefined);

  const submitAnswer = useCallback(() => {
    if (answer !== word) {
      markIncorrect(entry);
    }
    addHints(hintIndex);
    setHintIndex(3);
  }, [answer, word, markIncorrect, entry, addHints, hintIndex]);

  const next = useCallback(() => {
    if (hintIndex < 3) {
      skip(entry);
    } else {
      complete();
    }
    setHintIndex(0);
    setAnswer("");
  }, [hintIndex, skip, entry, complete]);

  const handleKeyPress = useCallback(
    (e) => {
      const { key } = e;
      switch (key) {
        case "Enter":
          if (hintIndex < 3 && answer.length !== 0) {
            submitAnswer();
          }
          break;
        case "ArrowDown":
          if (hintIndex < 3) {
            if (hintIndex === 2) {
              markIncorrect(entry);
            }
            setHintIndex(hintIndex + 1);
          }
          break;
        case "ArrowRight":
          next();
          break;
        case "Control":
          if (!quizStartWithTranslation || hintIndex >= 2) {
            sound.current = playSound(sound.current, word);
          }
          break;
        default: {
        }
      }
    },
    [
      answer,
      hintIndex,
      submitAnswer,
      next,
      sound,
      word,
      quizStartWithTranslation,
      markIncorrect,
      entry,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const meaningsDOM = meanings.map(({ type, meaning }, index) => (
    <div
      className="quiz-question-meaning-container"
      key={`quiz-meaning-${index}`}
    >
      {type && <span className="quiz-question-type">{type}</span>}
      <span className="quiz-question-meaning">{meaning}</span>
    </div>
  ));

  const letterCount = getOccurences(word, REGEX_LETTER);
  const specialCount = getOccurences(word, REGEX_SPECIAL);
  const spaceCount = getOccurences(word, REGEX_SPACE);

  const lettersDOM = (
    <p>
      There are <b>{letterCount}</b> letter(s), <b>{spaceCount}</b> space(s) and{" "}
      <b>{specialCount}</b> special character(s) (",", ".", "?", "!", or "-").
    </p>
  );

  const audioDOM = (
    <div>
      Pronunciation | Ctrl:{" "}
      <Audio
        onClick={() => {
          sound.current = playSound(sound.current, word);
        }}
      />
    </div>
  );

  const answerDOM = (
    <table className="quiz-answer-form">
      <tbody>
        <tr className="quiz-answer-row">
          <td>Answer:</td>
          <td>
            <input
              className={`quiz-answer-box${
                hintIndex >= 3
                  ? answer === word
                    ? " quiz-answer-box-correct"
                    : " quiz-answer-box-incorrect"
                  : ""
              }`}
              readOnly={hintIndex >= 3}
              value={answer}
              onChange={(e) => setAnswer(e.currentTarget.value)}
              autoFocus
            />
          </td>
        </tr>
        <tr
          className={`quiz-correct-answer-row${
            hintIndex >= 3 ? "" : " quiz-correct-answer-hidden-row"
          }`}
        >
          <td>Correct Answer:</td>
          <td>
            <input readOnly value={word} />
          </td>
        </tr>
      </tbody>
    </table>
  );

  const buttonRowDOM = (
    <div className="d-flex align-items quiz-button-row">
      <Button
        size="lg"
        disabled={hintIndex >= 3}
        variant={hintIndex >= 2 ? "danger" : "info"}
        onClick={() => {
          if (hintIndex === 2) {
            markIncorrect(entry);
          }
          setHintIndex(hintIndex + 1);
        }}
      >
        {hintIndex >= 2 ? (
          <span>
            Reveal Correct Answer (count as <b>Incorrect</b>) | ↓
          </span>
        ) : (
          <span>Next Hint | ↓</span>
        )}
      </Button>
      <Button
        size="lg"
        variant="primary"
        disabled={hintIndex >= 3 || answer.length === 0}
        onClick={() => {
          submitAnswer();
        }}
      >
        Submit answer | ↵
      </Button>
      <Button
        size="lg"
        variant="success"
        onClick={() => {
          next();
        }}
      >
        {hintIndex >= 3 ? (
          <span>Next | →</span>
        ) : (
          <span>
            Skip (count as <b>Correct</b>) | →
          </span>
        )}
      </Button>
    </div>
  );

  return (
    <>
      <div className="quiz-question-hint">
        <p>Hint 1:</p>
        {quizStartWithTranslation ? meaningsDOM : audioDOM}
      </div>
      {hintIndex >= 1 && (
        <div className="quiz-question-hint">
          <p>Hint 2:</p>
          {lettersDOM}
        </div>
      )}
      {hintIndex >= 2 && (
        <div className="quiz-question-hint">
          <p>Hint 3:</p>
          {quizStartWithTranslation ? audioDOM : meaningsDOM}
        </div>
      )}
      <div className="quiz-bottom-section">
        {answerDOM}
        {buttonRowDOM}
      </div>
    </>
  );
};
