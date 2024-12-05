import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";
import { useEffect } from "react";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();

  useEffect(() => {
    if (end) {
      const timeout = setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000); 
      return () => clearTimeout(timeout);
    }
  }, [end]);

  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""}
    ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">
            HireFlow
            <div className="spinner">
            </div>
          </h1>
          <p className="intro__scroll">Scroll to begin the journey</p>
          <button
            className="explore"
            onClick={() => {
              setPlay(true);
            }}
          >
            Start Now
          </button>
        </div>
      )}
      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <p className="outro__text">Wish you had a great journey with us.</p>
      </div>
    </div>
  );
};
