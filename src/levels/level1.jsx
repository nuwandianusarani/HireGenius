import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Stage-1.css";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const characterModels = {
  Sandy: "/models/sandy.glb",
  MinnieMouse: "/models/minnie_mouse.glb",
  Vanelope: "/models/vanellope.glb",
  IronMan: "/models/iron_man.glb",
  MasterSplinter: "/models/master_splinter.glb",
  JimmyNeutron: "/models/jimmy_neutron.glb",
  Zuko: "/models/zuko.glb",
  Garfield: "/models/garfield.glb",
};

const characterDescriptions = {
  Sandy: "Sandy brings energy and enthusiasm, always ready to dive into new challenges!",
  MinnieMouse: "Minnie Mouse knows how to take charge with charm and confidence, leading the way with style!",
  IronMan: "Iron Man combines intelligence and innovation, always thinking two steps ahead!",
  JimmyNeutron: "Jimmy Neutron is full of bright ideas and quick solutions, a true problem solver!",
  MasterSplinter: "Master Splinter is wise and strategic, guiding every decision with patience and insight!",
  Zuko: "Zuko’s determination and resilience make him unstoppable, turning setbacks into comebacks!",
  Garfield: "Garfield knows how to work smart, not hard—because efficiency is key!",
};


export default function Level1() {

  const navigate = useNavigate();
  const [applyingPosition, setApplyingPosition] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    experience: "",
    leadership: "",
    english: "",
    gender: "",
    salary: "",
  });

  const [selectedCharacter, setSelectedCharacter] = useState("Sandy");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const position = localStorage.getItem('applying_position') || 'Senior Engineer';
    setApplyingPosition(position);

    const completedStages = JSON.parse(localStorage.getItem("completedStages")) || [];
    if (completedStages.includes("Stage 1")) {
      navigate("/dashboard"); 
    }
  }, [navigate]);

  useEffect(() => {
    setIsLoading(true);
    const character = assignCharacter(
      formData.experience,
      formData.leadership,
      formData.english,
      formData.gender,
      formData.salary,
      formData.age
    );
    setSelectedCharacter(character);
    setIsLoading(false);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  function assignCharacter(experience, leadership, english, gender, salary, age) {
    if (gender === "Male" && experience === "5+ years") return "IronMan";
    if (gender === "Female" && leadership === "5+ years experience") return "MinnieMouse";
    if (english === "Fluent" && experience === "2-5 years") return "JimmyNeutron";
    if (experience === "Below 1 year") return "Sandy";
    if (leadership === "2-5 years experience") return "MasterSplinter";
    if (english === "Intermediate" && leadership !== "No experience") return "Zuko";
    if (salary > 70000) return "IronMan";
    if (salary < 30000) return "Garfield";
    return "Garfield";
  }
  
  function Character({ character }) {
    const modelPath = characterModels[character] || characterModels["Sandy"];
    const { scene } = useGLTF(modelPath);
    const modelRef = useRef();
  
    useFrame((state, delta) => {
      if (modelRef.current) {
        modelRef.current.rotation.y += delta * 0.5;
      }
    });
  
    return <primitive object={scene} ref={modelRef} scale={1} />;
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.leadership) newErrors.leadership = "Leadership experience is required";
    if (!formData.english) newErrors.english = "English proficiency is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.salary) newErrors.salary = "Salary expectation is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const candidateData = {
      candidate: {
        name: formData.name,
        age: formData.age,
        applying_position: applyingPosition,
        experience: formData.experience,
        leadership_experience: formData.leadership,
        english_proficiency: formData.english,
        salary_expectation: formData.salary,
        gender: formData.gender,
      },
    };

    localStorage.setItem("candidateData", JSON.stringify(candidateData));


    try {
      const response = await fetch("http://127.0.0.1:5000/get_category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidateData),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      const result = await response.json();

      // const result = {
      //   "category": "mid level",
      //   "status": "success"
      // }
    
      if (result.status === "success") {
        console.log("Category:", result.category);
        
        // Save result to localStorage
        localStorage.setItem("categoryResult", JSON.stringify(result));
        localStorage.setItem("completedStages", JSON.stringify(["Stage 1"]));
        navigate("/stage-2");

      } else {
        toast.error('Something went wrong.');
        console.error("Request failed:", result);
        
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
      toast.error('Something went wrong.');
    }    
    setIsLoading(false);

  };

  // {
  //   "category": "mid level",
  //   "status": "success"
  // }
  

  return (
    <div className="bg-dark">
      <Toaster />
      <div className="container-fluid d-flex vh-100 p-4 neon-bg">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center character-display neon-card">
        <div
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#ffffff",
              textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
            }}
          >
            HireGenius
          </div>
          <h3 className="text-center mb-4 neon-text">Your Character</h3>
          <div className="w-100 h-100 d-flex justify-content-center align-items-center character-canvas">
            {isLoading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls enableZoom={true} />
                <Suspense fallback={null}>
                  <Character character={selectedCharacter} />
                </Suspense>
              </Canvas>
            )}
          </div>
          <div className="mt-3 text-center neon-text">
            <h4>{formData.name || "Your Character"}</h4>
            <p>{characterDescriptions[selectedCharacter]}</p>
          </div>
        </div>

        <div className="col-md-6 p-4 neon-card">
          <h2 className="text-center mb-4 neon-text">Customize Your Character</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label neon-text">Your Name</label>
                  <input type="text" name="name" className="form-control neon-input" value={formData.name} onChange={handleChange} />
                  {errors.name && <div className="text-danger">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label neon-text">Age</label>
                  <input type="number" name="age" className="form-control neon-input" value={formData.age} onChange={handleChange} />
                  {errors.age && <div className="text-danger">{errors.age}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label neon-text">Gender</label>
                  <select name="gender" className="form-select neon-input" value={formData.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <div className="text-danger">{errors.gender}</div>}
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label neon-text">Experience</label>
                  <select name="experience" className="form-select neon-input" value={formData.experience} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Below 1 year">Below 1 year</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="2-5 years">2-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                  {errors.experience && <div className="text-danger">{errors.experience}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label neon-text">Leadership</label>
                  <select name="leadership" className="form-select neon-input" value={formData.leadership} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="No experience">No experience</option>
                    <option value="2-5 years experience">2-5 years experience</option>
                    <option value="5+ years experience">5+ years experience</option>
                  </select>
                  {errors.leadership && <div className="text-danger">{errors.leadership}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label neon-text">English Proficiency</label>
                  <select name="english" className="form-select neon-input" value={formData.english} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Fluent">Fluent</option>
                  </select>
                  {errors.english && <div className="text-danger">{errors.english}</div>}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label neon-text">Salary Expectation</label>
              <input type="number" name="salary" className="form-control neon-input" min="0" value={formData.salary} onChange={handleChange} />
              {errors.salary && <div className="text-danger">{errors.salary}</div>}
            </div>
            <button type="submit" className="btn btn-success w-100 neon-button">Submit & Go to Next Stage</button>
          </form>
        </div>
      </div>
    </div>
  );
}