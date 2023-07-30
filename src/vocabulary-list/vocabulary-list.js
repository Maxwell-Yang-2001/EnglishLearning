import React from "react";
import "./vocabulary-list.css";
import { connect } from "react-redux";
import { setLessonIndexAndTime } from "../redux/action";

const SORRY_MESSAGE = new Audio("./audio/sorry-message.mp3");
const REGEX_REPLACER = /,|\.|!|\?/g;

const playSound = (sound, word) => {
  if (sound) {
    sound.pause();
  }

  const fileName = word
    .toLowerCase()
    .replaceAll(REGEX_REPLACER, "")
    .replaceAll(" ", "-");

  sound = new Audio(`./audio/${fileName}.mp3`);
  sound.play().catch(() => {
    sound = SORRY_MESSAGE;
    return sound.play();
  });
};

const VocabularyList = ({ vocabulary }) => {
  let sound;

  if (!vocabulary) {
    return (
      <div className="vocabulary-tiles-container d-flex">
        <span>No vocabulary found for selected lesson.</span>
      </div>
    );
  }

  return (
    <div className="vocabulary-tiles-container align-items-center">
      {vocabulary.map(({ word, meanings }, index) => (
        <div className="vocabulary-tile" key={`vocabulary-tile-${index}`}>
          <span
            className="vocabulary-tile-word"
            onClick={() => {
              playSound(sound, word);
            }}
          >
            {word}
          </span>
          {meanings.map(
            (
              {
                type,
                meaning,
                thirdPerson,
                presentParticiple,
                past,
                pastParticiple,
              },
              index
            ) => (
              <div
                className="vocabulary-tile-meaning-container"
                key={`vocabulary-tile-meaning-${index}`}
              >
                {type && <span className="vocabulary-tile-type">{type}</span>}
                <span className="vocabulary-tile-meaning">{meaning}</span>
                {thirdPerson && (
                  <>
                    <span className="vocabulary-tile-verb-form-connector">
                      {"( third-person: "}
                    </span>
                    <span
                      className="vocabulary-tile-verb-form"
                      onClick={() => {
                        playSound(sound, thirdPerson);
                      }}
                    >
                      {thirdPerson}
                    </span>
                    <span className="vocabulary-tile-verb-form-connector">
                      {", present participle: "}
                    </span>
                    <span
                      className="vocabulary-tile-verb-form"
                      onClick={() => {
                        playSound(sound, presentParticiple);
                      }}
                    >
                      {presentParticiple}
                    </span>
                    <span className="vocabulary-tile-verb-form-connector">
                      {", past: "}
                    </span>
                    <span
                      className="vocabulary-tile-verb-form"
                      onClick={() => {
                        playSound(sound, past);
                      }}
                    >
                      {past}
                    </span>
                    <span className="vocabulary-tile-verb-form-connector">
                      {", past participle: "}
                    </span>
                    <span
                      className="vocabulary-tile-verb-form"
                      onClick={() => {
                        playSound(sound, pastParticiple);
                      }}
                    >
                      {pastParticiple}
                    </span>
                    <span className="vocabulary-tile-verb-form-connector">
                      {" )"}
                    </span>
                  </>
                )}
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  vocabulary:
    state.coursesInfoMap[state.course][state.lessonIndex]["vocabulary"],
});

const mapDispatchToProps = (dispatch) => ({
  setLessonIndexAndTime: (lesson, time) =>
    dispatch(setLessonIndexAndTime(lesson, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabularyList);
