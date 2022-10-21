import { useRef, useState, useEffect } from "react";
import "./App.css";
import sampleVideo from "./video/sample-mp4-file-small.mp4";

function App() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(5);
  const [sound,setSound] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false);

  // useEffect(() => {
  //   const  onFullscreenChange=()=> {
  //     setIsFullscreen(Boolean(document.fullscreenElement));
  //   }

  //   document.addEventListener('fullscreenchange', onFullscreenChange);

  //   return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  // }, []);

  const videoHandler = (control) => {
    if (control === "play") {
      videoRef.current.play();
      setPlaying(true);
      var vid = document.getElementById("video1");
      setVideoTime(vid.duration);
    } else if (control === "pause") {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const fastForward = () => {
    videoRef.current.currentTime = currentTime + 5;
  };

  const revert = () => {
    videoRef.current.currentTime = currentTime - 5;
  };
  // const mute = ()=>{
  //   videoRef.current.volume =
  // }

  window.setInterval(function () {
    setCurrentTime(videoRef.current?.currentTime);
    setProgress((videoRef.current?.currentTime / videoTime) * 100);
  }, 1000);

  const mute = () => {
    console.log("mute", videoRef);
    videoRef.current.muted = true;
    setVolume(0);
    setSound(false);
  };
  const unmute = () => {
    console.log("unmute", videoRef);
    videoRef.current.muted = false;
    setVolume(5);
    setSound(true)
  };

  const volumeOnChange = (e) => {
    console.log("slider", e);
    const value = e?.target?.value ?? 5;
    setVolume(value);
    console.log("volume", videoRef);
    videoRef.current.volume = value;
  };

  // const  onFullscreenChange=()=> {
  //   videoRef.current.onFullscreenChange=true
  //       setIsFullscreen(Boolean(document.fullscreenElement));
  //     }

  const onFullscreenChange = () => {
    console.log("fullscreen");
    const div = document.getElementById("video1");
    if (div.requestFullscreen) div.requestFullscreen();
    else if (div.webkitRequestFullscreen) div.webkitRequestFullscreen();
    else if (div.msRequestFullScreen) div.msRequestFullScreen();
  };

  // document.addEventListener('fullscreenchange', onFullscreenChange);

  // return () => document.removeEventListener('fullscreenchange', onFullscreenChange);

  return (
    <div className="app">
      <div className="videoMainContainer">
        <div className="heading"  >
        <h3 >my video</h3>
        </div>
        <div className="vid">
          <video
            id="video1"
            ref={videoRef}
            className="video"
            src="https://vjs.zencdn.net/v/oceans.mp4"
          ></video>
        </div>

        <div className="playControls">
          {/* <img
            onClick={revert}
            className="controlsIcon"
            alt="no img"
            src="./images/10rewind.png"
          /> */}
          <img onClick={revert}
            className="controlsIcon" src="https://img.icons8.com/ios/50/000000/skip-15-seconds-back.png"/>
          {playing ? (
            <img
              onClick={() => videoHandler("pause")}
              className="controlsIcon--small"
              src="https://img.icons8.com/cotton/64/000000/circled-pause.png"
            />
          ) : (
            <img
              onClick={() => videoHandler("play")}
              className="controlsIcon--small"
              src="https://img.icons8.com/ios/50/000000/play-button-circled.png"
            />
           
          )}
          {/* <img
            className="controlsIcon"
            onClick={fastForward}
            alt="no img"
            src="./images/fast-forward.png"
          /> */}
          <img className="controlsIcon"
            onClick={fastForward} 
            src="https://img.icons8.com/ios/50/000000/forward-10.png"/>
        </div>
        <div className="timeControls">
          <div className="time_bar">
            <div
              style={{ width: `${progress}%` }}
              className="time_progressBar"
            ></div>
          </div>
          <div className="seekBar" >
            <p className="controlsTime">
              {Math.floor(currentTime / 60) +
                ":" +
                ("0" + Math.floor(currentTime % 60)).slice(-2)}
            </p>
            <p>/</p>
            <p className="controlsTime">
              {Math.floor(videoTime / 60) +
                ":" +
                ("0" + Math.floor(videoTime % 60)).slice(-2)}
            </p>
          </div>
        </div>
        <div className="volumeControls">
          <input
            type="range"
            min="0"
            max="5"
            step="1"
            value={volume}
            onChange={volumeOnChange}
          />
          {sound ? (<button onClick={mute}>
          <img src="https://img.icons8.com/material-sharp/24/000000/high-volume--v1.png"/>
          </button>):
          (<button onClick={unmute}>
          <img src="https://img.icons8.com/material-sharp/24/000000/mute.png"/>
          </button>) }
          
          

          <button onClick={onFullscreenChange} style={{ zIndex: "9999" }}>
            {/* {" "} */}
            <img
              width={20}
              src="https://img.icons8.com/fluency-systems-regular/48/000000/fullscreen.png"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
