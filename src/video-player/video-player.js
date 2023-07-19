import React, { useEffect } from "react";
import "./video-player.css";

export const VideoPlayer = () => {
  let player,
    currentTime = 0;

  // relative seek +/- 10s
  const handler = (e) => {
    e.preventDefault();
    if (e.key === "ArrowLeft") {
      player.currentTime = currentTime - 10;
    } else if (e.key === "ArrowRight") {
      player.currentTime = currentTime + 10;
    }
  };

  const ref = (ref) => {
    player = ref;
  };

  useEffect(() => {
    window.addEventListener("keydown", handler, false);
    return () => window.removeEventListener("keydown", handler, false);
  }, []);

  // HACK: every 100 ms (assumed to be fast enough for spamming left or right)
  // get the current time of the player so relative seeks can be calculated
  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        currentTime = player.currentTime;
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="player-page-wrapper">
      <video id="video-player" controls ref={ref}>
        <source src="videos/concept1.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
