import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Float, Html, Sky, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useNavigate } from "react-router-dom";

const CanvasScene = () => {
  const [completedCategories, setCompletedCategories] = useState([]);
  const navigate = useNavigate();

  const categories = [
    { name: "Stage 1", emoji: "⚙️", link: "/stage-1" },
    { name: "Stage 2", emoji: "🧠", link: "/stage-2" },
    { name: "Stage 3", emoji: "🤝", link: "/stage-3" },
  ];

  useEffect(() => {
    const storedCategories = localStorage.getItem("completedCategories");
    if (storedCategories) {
      setCompletedCategories(JSON.parse(storedCategories)); 
    } else {
      setCompletedCategories([]); 
    }
  }, []);

  const handleRedirect = (link) => {
    navigate(link);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
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
        Hire Genius
      </div>

      <Canvas>
        {/*Background */}
        <Sky distance={450000} sunPosition={[100, 10, 1000]} />
        <Stars radius={100} depth={10} count={20000} fade speed={1} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[100, 100, 100]} color="green" intensity={1.5} />

        {/* Orbit Controls */}
        <OrbitControls enableZoom={false} />

        {/* Postprocessing Effects */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.3} height={300} />
        </EffectComposer>

        {/* Floating Spheres */}
        {categories.map((category, index) => (
          <Float key={category.name} speed={2} rotationIntensity={1} floatIntensity={2}>
            <group>
              {/* Sphere with Click Handler */}
              <Sphere
                args={[0.7, 64, 64]}
                position={[index * 3 - 3, 0, 0]}
                onClick={() => handleRedirect(category.link)}
              >
                <meshStandardMaterial
                  color={
                    completedCategories.includes(category.name)
                      ? "#777777"
                      : "#ff7700"
                  }
                  emissive={completedCategories.includes(category.name) ? "#555555" : "#ff4400"}
                />
              </Sphere>

              <Html
                position={[index * 3 - 3, 1, 0]}
                center
                style={{
                  fontSize: "2rem",
                  textAlign: "center",
                  color: completedCategories.includes(category.name) ? "#aaaaaa" : "#ffffff",
                  textShadow: "0px 0px 10px rgba(255, 255, 255, 0.9)",
                  cursor: "pointer", 
                }}
                onClick={() => handleRedirect(category.link)}
              >
                {category.name}
              </Html>
            </group>
          </Float>
        ))}
      </Canvas>
    </div>
  );
};

export default CanvasScene;
