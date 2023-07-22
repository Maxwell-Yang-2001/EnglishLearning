import React from "react";
import "./video-page.css";
import VideoPlayer from "../video-player/video-player";
import LessonSelector from "../lesson-selector/lesson-selector";

export const VideoPage = () => {
  return (
    <div className="player-page">
      <VideoPlayer />
      <LessonSelector />
    </div>
  );
};
