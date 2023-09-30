import { useEffect, useRef, useState } from "react";

export const CommonVideo = ({ src }) => {
  const videoRef = useRef(null);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentDuration, setVideoCurrentDuration] = useState(0);

  const toggleVideo = () => {
    if (!videoIsPlaying) {
      videoRef.current.play();
      setVideoIsPlaying(true);
    } else if (videoIsPlaying) {
      videoRef.current.pause();
      setVideoIsPlaying(false);
    }
  };

  const handleVolume = ({ target }) => {
    setVolume(target.value);
    videoRef.current.volume = target.value;
  };

  const handleVideoBar = ({ target }) => {
    videoRef.current.currentTime = target.value;
  };

  return (
    <div>
      <div className="videoDiv">
        <video
          src={src}
          ref={videoRef}
          onTimeUpdate={() =>
            setVideoCurrentDuration(videoRef.current.currentTime)
          }
          className="cursor-pointer videoElement"
          onClick={toggleVideo}
        />
        <div>
          <input
            type="range"
            min={0}
            max={videoRef.current && videoRef.current.duration}
            step={1}
            value={videoCurrentDuration}
            onChange={handleVideoBar}
            className="video-bar"
          />
        </div>
        <div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
          />
        </div>
      </div>
    </div>
  );
};
