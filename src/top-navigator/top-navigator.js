import React from "react";
import "./top-navigator.css";
import { connect } from "react-redux";
import { setTab, setCourse } from "../redux/action";

const TopNavigator = ({
  tab,
  setTab,
  course,
  courses,
  setCourse,
  pageNumber,
}) => {
  const tabTitles = ["Video", "Vocabulary", "Quiz"];
  return (
    <div className="top-navbar d-flex align-items-center">
      {tabTitles.map((tabTitle, index) => (
        <span
          key={`tab-${index}`}
          className={`top-navbar-tab${index === tab ? " selected" : ""}`}
          onClick={() => {
            if (index !== tab) {
              console.log(index);
              setTab(index);
            }
          }}
        >
          {tabTitle}
        </span>
      ))}
      <a
        className="top-navbar-pdf"
        target="_blank"
        rel="noreferrer"
        href={`./pdfs/${course}.pdf${pageNumber ? `#page=${pageNumber}` : ""}`}
      >
        PDF
      </a>
      <select
        className="top-navbar-course-selector"
        value={course}
        onChange={(e) => {
          const newCourse = e.target.value;
          if (newCourse !== course) {
            setCourse(newCourse);
          }
        }}
      >
        {courses.map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tab: state.tab,
  course: state.course,
  courses: Object.keys(state.coursesInfoMap),
  pageNumber: state.coursesInfoMap[state.course][state.lessonIndex].pageNumber,
});

const mapDispatchToProps = (dispatch) => ({
  setTab: (tab) => dispatch(setTab(tab)),
  setCourse: (course) => dispatch(setCourse(course)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNavigator);
