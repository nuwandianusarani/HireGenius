import React, { useState, useEffect } from "react";

const Stage2 = () => {
  const totalLevels = 3; // Total number of levels
  const [unlockedLevel, setUnlockedLevel] = useState(1);

  useEffect(() => {
    //unlocked Level is in sync with local storage
    const savedLevel = parseInt(localStorage.getItem("unlockedLevel")) || 1;
    setUnlockedLevel(savedLevel);
  }, []);

  // Handle clicking on a level
  const handleLevelClick = (level) => {
    if (level <= unlockedLevel) {
      if (level === totalLevels) {
        alert("Congratulations! You've completed all levels!");
        window.location.href = "/dashboard"; 
      } else {
        window.location.href = `/level-${level}`;
      }
    } else {
      alert("You need to complete the previous level first!");
    }
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#ffffff",
          zIndex: 10,
          padding: "10px",
          textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        HireFlow
      </div>

      <div className="level-map bg-image d-flex flex-column justify-content-center align-items-center">
        {/* Level 1 */}
        <div
          className={`level-container`}
          style={{ position: "absolute", top: "20%", left: "12%" }}
        >
          <div
            className={`level ${unlockedLevel >= 1 ? "unlocked" : "locked"}`}
            onClick={() => handleLevelClick(1)}
          >
            <span className="badge bg-primary fs-4">1</span>
          </div>
          {unlockedLevel === 1 && (
            <div className="play-message">Let's play this level!</div>
          )}
        </div>

        {/* Level 2 */}
        <div
          className={`level-container`}
          style={{ position: "absolute", top: "67%", left: "24%" }}
        >
          <div
            className={`level ${unlockedLevel >= 2 ? "unlocked" : "locked"}`}
            onClick={() => handleLevelClick(2)}
          >
            <span className="badge bg-primary fs-4">2</span>
          </div>
          {unlockedLevel === 2 && (
            <div className="play-message">Let's play this level!</div>
          )}
        </div>

        {/* Level 3 */}
        <div
          className={`level-container`}
          style={{ position: "absolute", top: "30%", left: "70%" }}
        >
          <div
            className={`level ${unlockedLevel >= 3 ? "unlocked" : "locked"}`}
            onClick={() => handleLevelClick(3)}
          >
            <span className="badge bg-primary fs-4">3</span>
          </div>
          {unlockedLevel === 3 && (
            <div className="play-message">Let's play this level!</div>
          )}
        </div>

        {/* Back Button */}
        <div
          className={`back-container`}
          style={{ position: "absolute", top: "70%", left: "75%" }}
        >
          <div
            className={`back-btn-levels-map unlocked`}
            onClick={() => (window.location.href = '/dashboard')}
          >
            <span className="badge bg-primary fs-6">Back</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stage2;
