import React from "react";
import "./video-player.css";
import { connect } from "react-redux";
import { setTime, setLessonIndexAndTime } from "../redux/action";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.currentTime = props.time;
    this.playerRef = React.createRef();
    this.savedTime = props.time;
  }

  componentDidMount() {
    // relative seek +/- 10s and pause/play
    if (this.playRef?.current) {
      this.playerRef.current.currentTime = this.currentTime;
    }
    this.handler = (e) => {
      if (e.key === "ArrowLeft") {
        if (this.playerRef.current?.currentTime) {
          this.playerRef.current.currentTime = this.currentTime - 10;
        }
      } else if (e.key === "ArrowRight") {
        if (this.playerRef.current?.currentTime) {
          this.playerRef.current.currentTime = this.currentTime + 10;
        }
      } else if (e.key === " ") {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", this.handler, false);

    // HACK: every 100 ms (assumed to be fast enough for spamming left or right)
    // get the current time of the player so relative seeks can be calculated
    this.interval = setInterval(() => {
      if (this.playerRef.current?.paused) {
        return;
      }
      if (this.playerRef.current?.currentTime) {
        this.currentTime = this.playerRef.current.currentTime;
        let lessonIndex = this.props.lessonIndex;
        while (
          this.props.timestamps.length > lessonIndex + 1 &&
          this.props.timestamps[lessonIndex + 1].time <= this.currentTime
        ) {
          lessonIndex++;
        }
        while (
          lessonIndex > 0 &&
          this.props.timestamps[lessonIndex].time > this.currentTime
        ) {
          lessonIndex--;
        }
        if (this.props.lessonIndex !== lessonIndex) {
          this.props.setLessonIndexAndTime(lessonIndex, this.currentTime);
        }
      }
    }, 100);
  }

  componentDidUpdate({ course }) {
    if (this.currentTime !== this.props.time) {
      this.currentTime = this.props.time;
      if (this.playerRef.current?.currentTime) {
        this.playerRef.current.currentTime = this.props.time;
      }
    }
    if (course !== this.props.course && this.playerRef.current) {
      this.playerRef.current.load();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handler, false);
    clearInterval(this.interval);
    this.props.setTime(this.playerRef.current.currentTime);
  }

  render() {
    return (
      <div className="video-container d-flex align-items-center">
        <video
          className="video-player"
          controls
          ref={this.playerRef}
          autoFocus
          src={`videos/${this.props.course}.mp4#t=${this.savedTime}`}
        >
        </video>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  time: state.time,
  timestamps: state.coursesInfoMap[state.course],
  lessonIndex: state.lessonIndex,
  course: state.course,
});

const mapDispatchToProps = (dispatch) => ({
  setTime: (time) => dispatch(setTime(time)),
  setLessonIndexAndTime: (lessonIndex, time) =>
    dispatch(setLessonIndexAndTime(lessonIndex, time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
