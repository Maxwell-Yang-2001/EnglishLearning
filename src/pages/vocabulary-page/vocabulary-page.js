import React from "react";
import "./vocabulary-page.css";
import LessonSelector from "../../lesson-selector/lesson-selector";
import VocabularyList from "../../vocabulary-list/vocabulary-list";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  vocabulary:
    state.coursesInfoMap[state.course][state.lessonIndex]["vocabulary"],
});

const VocabularyPage = ({ vocabulary }) => (
  <>
    <VocabularyList vocabulary={vocabulary} />
    <LessonSelector />
  </>
);

export default connect(mapStateToProps)(VocabularyPage);
