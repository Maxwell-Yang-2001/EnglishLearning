import React from "react";
import "./video-player.css";
import { connect } from "react-redux";
import { setTime, setLesson } from "../redux/action";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.currentTime = props.time;
    this.playerRef = React.createRef();
  }

  componentDidMount() {
    // relative seek +/- 10s and pause/play
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
      if (this.playerRef.current?.currentTime) {
        this.currentTime = this.playerRef.current.currentTime;
        let lesson = this.props.lesson;
        while (
          this.props.timestamps.length > lesson + 1 &&
          this.props.timestamps[lesson + 1].time <= this.currentTime
        ) {
          lesson++;
        }
        while (lesson > 0 && this.props.timestamps[lesson].time > this.currentTime) {
          lesson--;
        }
        if (this.props.lesson !== lesson) {
          this.props.setLesson(lesson);
          this.props.setTime(this.currentTime);
        }
      }
    }, 100);
  }

  componentDidUpdate() {
    if (this.currentTime !== this.props.time) {
      this.currentTime = this.props.time;
      if (this.playerRef.current?.currentTime) {
        this.playerRef.current.currentTime = this.props.time;
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handler, false);
    clearInterval(this.interval);
    this.props.setTime(this.playerRef.current.currentTime);
  }

  render() {
    return (
      <video id="video-player" controls ref={this.playerRef} autoFocus>
        <source
          src={`videos/concept1.mp4#t=${this.props.time}`}
          type="video/mp4"
        />
      </video>
    );
  }
}

const mapStateToProps = (state) => ({
  time: state.time,
  timestamps: state.timestamps,
  lesson: state.lesson,
});

const mapDispatchToProps = (dispatch) => ({
  setTime: (time) => dispatch(setTime(time)),
  setLesson: (lesson) => dispatch(setLesson(lesson)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
