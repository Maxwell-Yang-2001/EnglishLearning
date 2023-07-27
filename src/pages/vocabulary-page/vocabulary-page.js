import React from "react";
import "./vocabulary-page.css";
import LessonSelector from "../../lesson-selector/lesson-selector";
import VocabularyList from "../../vocabulary-list/vocabulary-list";

export const VocabularyPage = () => (
  <>
    <VocabularyList />
    <LessonSelector />
  </>
);
