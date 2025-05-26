import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Float, Html, Sky, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useNavigate } from "react-router-dom";
import "../assets/css/CanvasScene.css"; 

const CanvasScene = () => {
  const [completedStages, setCompletedStages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const stages = [
    { name: "Stage 1", emoji: "⚙️", link: "/stage-1" },
    { name: "Stage 2", emoji: "🧠", link: "/stage-2" },
    { name: "Stage 3", emoji: "🤝", link: "/stage-3" },
  ];

  // Load completed stages from localStorage
  useEffect(() => {
    const storedStages = localStorage.getItem("completedStages");
    if (storedStages) {
      setCompletedStages(JSON.parse(storedStages));
    } else {
      setCompletedStages([]);
    }
  }, []);

  // Handle stage navigation
  const handleStageClick = (stage) => {
    const stageIndex = stages.findIndex((s) => s.name === stage.name);

    // Check if the stage is already completed
    if (completedStages.includes(stage.name)) {
      setErrorMessage(`You have already completed ${stage.name}.`);
      return;
    }

    // Check if the previous stage is completed
    if (stageIndex > 0 && !completedStages.includes(stages[stageIndex - 1].name)) {
      setErrorMessage(`Please complete ${stages[stageIndex - 1].name} first.`);
      return;
    }

    // Navigate to the stage
    navigate(stage.link);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      {/* Header */}
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
          padding: "20px",
          textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
        }}
      >
        HireGenius
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#ff4444",
            fontSize: "1.2rem",
            textShadow: "0 0 5px rgba(255, 0, 0, 0.8)",
            zIndex: 10,
          }}
        >
          {errorMessage}
        </div>
      )}

      <Canvas>
        {/* Background */}
        <Sky distance={450000} sunPosition={[100, 10, 1000]} />
        <Stars radius={100} depth={50} count={5000} fade speed={2} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#ff7700" intensity={1.5} />
        <pointLight position={[-10, -10, -10]} color="#00ffcc" intensity={1.5} />

        {/* Orbit Controls */}
        <OrbitControls enableZoom={false} enablePan={false} />

        {/* Postprocessing Effects */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.3} height={300} />
        </EffectComposer>

        {/* Floating Spheres */}
        {stages.map((stage, index) => (
          <Float
            key={stage.name}
            speed={2}
            rotationIntensity={1}
            floatIntensity={2}
          >
            <group>
              {/* Sphere */}
              <Sphere
                args={[0.7, 64, 64]}
                position={[index * 3 - 3, 0, 0]}
                onClick={() => handleStageClick(stage)}
              >
                <meshStandardMaterial
                  color={
                    completedStages.includes(stage.name) ? "#777777" : "#ff7700"
                  }
                  emissive={
                    completedStages.includes(stage.name) ? "#555555" : "#ff4400"
                  }
                  emissiveIntensity={2}
                />
              </Sphere>

              {/* Emoji and Stage Name inside the Sphere */}
              <Html
                position={[index * 3 - 3, 0, 0]}
                center
                style={{
                  fontSize: "2rem",
                  textAlign: "center",
                  color: completedStages.includes(stage.name) ? "gray" : "#ffffff",
                  textShadow: "0px 0px 10px rgba(0, 0, 0, 0.9)",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, color 0.2s ease",
                }}
                onPointerEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                  e.target.style.color = "#00ffcc";
                }}
                onPointerLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.color = completedStages.includes(stage.name)
                    ? "#aaaaaa"
                    : "#ffffff";
                }}
                onClick={() => handleStageClick(stage)}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div>{stage.emoji}</div>
                  <div style={{ fontSize: "1rem", marginTop: "10px" }}  onClick={() => handleStageClick(stage)}>{stage.name}</div>
                </div>
              </Html>
            </group>
          </Float>
        ))}
      </Canvas>
    </div>
  );
};

export default CanvasScene;