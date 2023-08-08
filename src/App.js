import "./App.css";
import { QuizPage } from "./pages/quiz-page/quiz-page";
import { VideoPage } from "./pages/video-page/video-page";
import VocabularyPage from "./pages/vocabulary-page/vocabulary-page";
import TopNavigator from "./top-navigator/top-navigator";
import { connect } from "react-redux";

const App = ({ tab }) => (
  <>
    <TopNavigator />
    {tab === 0 && <VideoPage />}
    {tab === 1 && <VocabularyPage />}
    {tab === 2 && <QuizPage />}
  </>
);

const mapStateToProps = (state) => ({
  tab: state.tab,
});

export default connect(mapStateToProps)(App);
