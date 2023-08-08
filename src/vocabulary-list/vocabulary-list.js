import React from "react";
import "./vocabulary-list.css";
import { connect } from "react-redux";
import {
  setLessonIndexAndTime,
  setVocabularyPlaybackRate,
} from "../redux/action";
import { Slider } from "@mui/material";
import { playSound } from "../utils/audio";

const VocabularyList = ({
  vocabulary,
  vocabularyPlaybackRate,
  setVocabularyPlaybackRate,
}) => {
  let sound;

  if (!vocabulary) {
    return (
      <div className="vocabulary-tiles-container d-flex">
        <span>No vocabulary found for selected lesson.</span>
      </div>
    );
  }

  return (
    <div className="vocabulary-tiles-container">
      <div className="vocabulary-playback-speed-slider">
        <p>Speed</p>
        <p>1.0</p>
        <Slider
          orientation="vertical"
          value={vocabularyPlaybackRate}
          step={0.05}
          marks
          min={0.25}
          max={1.0}
          onChangeCommitted={(_, val) => {
            setVocabularyPlaybackRate(val);
          }}
        />
        <p>0.25</p>
      </div>
      {vocabulary.map((entry, index) => (
        <div className="vocabulary-tile" key={`vocabulary-tile-${index}`}>
          {entry.word ? (
            <>
              <span
                className="vocabulary-tile-word"
                onClick={() => {
                  sound = playSound(sound, entry.word, vocabularyPlaybackRate);
                }}
              >
                {entry.word}
              </span>
              {entry.meanings.map(
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
                    {type && (
                      <span className="vocabulary-tile-type">{type}</span>
                    )}
                    <span className="vocabulary-tile-meaning">{meaning}</span>
                    {thirdPerson && (
                      <>
                        <span className="vocabulary-tile-verb-form-connector">
                          {"( third-person: "}
                        </span>
                        <span
                          className="vocabulary-tile-verb-form"
                          onClick={() => {
                            sound = playSound(
                              sound,
                              thirdPerson,
                              vocabularyPlaybackRate
                            );
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
                            sound = playSound(
                              sound,
                              presentParticiple,
                              vocabularyPlaybackRate
                            );
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
                            sound = playSound(
                              sound,
                              past,
                              vocabularyPlaybackRate
                            );
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
                            sound = playSound(
                              sound,
                              pastParticiple,
                              vocabularyPlaybackRate
                            );
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
            </>
          ) : (
            entry
          )}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  vocabularyPlaybackRate: state.vocabularyPlaybackRate,
});

const mapDispatchToProps = (dispatch) => ({
  setLessonIndexAndTime: (lesson, time) =>
    dispatch(setLessonIndexAndTime(lesson, time)),
  setVocabularyPlaybackRate: (vocabularyPlaybackRate) =>
    dispatch(setVocabularyPlaybackRate(vocabularyPlaybackRate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VocabularyList);
