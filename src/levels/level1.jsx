import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Stage-1.css";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { db } from '../firebase/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { APP_URL } from "../constants/Config";
import skyThemeStyles from "./skyThemeStyles";
import { getAuth } from "firebase/auth";

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
  Zuko: "Zuko's determination and resilience make him unstoppable, turning setbacks into comebacks!",
  Garfield: "Garfield knows how to work smart, not hard—because efficiency is key!",
};

const characterEmojis = {
  Sandy: "🖥️🌊",
  MinnieMouse: "🎨🧠",
  IronMan: "💻🛡️",
  JimmyNeutron: "🧠🔧",
  MasterSplinter: "📚🧘",
  Zuko: "🔥👨‍💻",
  Garfield: "⌛🐱",
};

// Add inline styles for error messages to ensure they display properly
const errorMessageStyle = {
  color: '#dc3545',
  fontSize: '0.875rem',
  marginTop: '0.25rem',
  display: 'block',
  fontWeight: '500'
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
    position: ""
  });

  const [selectedCharacter, setSelectedCharacter] = useState("Sandy");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [email, setEmail] = useState('');

  useEffect(() => {
    // const position = localStorage.getItem('applying_position') || 'Senior Engineer';
    // setApplyingPosition(position);

    const auth = getAuth();
    const user = auth.currentUser;
    setEmail(user.email);

    // const email = localStorage.getItem('userEmail');

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

  const showToastMessage = (message, isSuccess = true) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing/selecting
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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
    
    // Validate each field
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.age || formData.age <= 0) {
      newErrors.age = "Valid age is required";
    }
    
    if (!formData.experience) {
      newErrors.experience = "Experience level is required";
    }
    
    if (!formData.leadership) {
      newErrors.leadership = "Leadership experience is required";
    }
    
    if (!formData.english) {
      newErrors.english = "English proficiency is required";
    }
    
    if (!formData.gender) {
      newErrors.gender = "Gender selection is required";
    }

    if (!formData.position) {
      newErrors.position = "Position selection is required";
    }
    
    if (!formData.salary || formData.salary <= 0) {
      newErrors.salary = "Valid salary expectation is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Show toast message for validation errors
      toast.error('Please fill in all required fields correctly.');
      return;
    }

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
        position: formData.position
      },
    };

    try {
      const response = await fetch( APP_URL + "/get_category", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json" 
        },
        body: JSON.stringify(candidateData),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
    
      if (result.status === "success") {
        await addDoc(collection(db, "candidates"), {
          candidate: candidateData,
          category: result.category,
          email: email,
          createdAt: new Date()
        });

        console.log('Data added:', result);     
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

  return (
    <>
      <style>{skyThemeStyles}</style>
      <Toaster position="top-right" />
      <div className="sky-container">
        <div className="toast">{toastMessage}</div>
        
        <div className="clouds">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
        </div>

        <div className="game-title">HireGenius</div>
        
        <div className="main-content">
          <div className="character-section">
            <div className="character-card">
              <div className="character-info">
                <h3>Your Character</h3>
              </div>
              
              <div className="character-display">
                <div className="character-glow"></div>
                {isLoading ? (
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100%',
                    fontSize: '1.2rem',
                    color: '#1565c0'
                  }}>
                    <div className="loading-spinner"></div>
                    Loading Character...
                  </div>
                ) : (
                  <div className="character-emoji">
                    {characterEmojis[selectedCharacter]}
                  </div>
                )}
              </div>
              
              <div className="character-info">
                <h3>{formData.name || "Your Character"}</h3>
                <div className="character-description">
                  {characterDescriptions[selectedCharacter]}
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-card">
              <h2 className="form-title">Customize Your Character</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      value={formData.name} 
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                    {errors.name && <span style={errorMessageStyle}>{errors.name}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Age *</label>
                    <input 
                      type="number" 
                      name="age" 
                      className={`form-input ${errors.age ? 'error' : ''}`}
                      value={formData.age} 
                      onChange={handleChange}
                      placeholder="Your age"
                      min="1"
                    />
                    {errors.age && <span style={errorMessageStyle}>{errors.age}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Gender *</label>
                    <select 
                      name="gender" 
                      className={`form-select ${errors.gender ? 'error' : ''}`}
                      value={formData.gender} 
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors.gender && <span style={errorMessageStyle}>{errors.gender}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Experience *</label>
                    <select 
                      name="experience" 
                      className={`form-select ${errors.experience ? 'error' : ''}`}
                      value={formData.experience} 
                      onChange={handleChange}
                    >
                      <option value="">Select Experience</option>
                      <option value="Below 1 year">Below 1 Year</option>
                      <option value="1-2 years">1-2 Years</option>
                      <option value="2-5 years">2-5 Years</option>
                      <option value="5-10 years">5-10 Years</option>
                    </select>
                    {errors.experience && <span style={errorMessageStyle}>{errors.experience}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Leadership Experience *</label>
                    <select 
                      name="leadership" 
                      className={`form-select ${errors.leadership ? 'error' : ''}`}
                      value={formData.leadership} 
                      onChange={handleChange}
                    >
                      <option value="">Select Leadership</option>
                      <option value="No experience">No experience</option>
                      <option value="1-2 years experience">1-2 years experience</option>
                      <option value="2-5 years experience">2-5 years experience</option>
                      <option value="5+ years experience">5+ years experience</option>
                    </select>
                    {errors.leadership && <span style={errorMessageStyle}>{errors.leadership}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">English Proficiency *</label>
                    <select 
                      name="english" 
                      className={`form-select ${errors.english ? 'error' : ''}`}
                      value={formData.english} 
                      onChange={handleChange}
                    >
                      <option value="">Select Proficiency</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Fluent">Fluent</option>
                    </select>
                    {errors.english && <span style={errorMessageStyle}>{errors.english}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Applying Position *</label>
                    <select 
                      name="position" 
                      className={`form-select ${errors.position ? 'error' : ''}`}
                      value={formData.position} 
                      onChange={handleChange}
                    >
                      <option value="">Apply Position</option>
                      <option value="Trainee">Trainee</option>
                      <option value="Junior Developer">Junior Developer</option>
                      <option value="Senior Engineer">Senior Engineer</option>
                      <option value="Associate Engineer">Associate Engineer</option>
                    </select>
                    {errors.position && <span style={errorMessageStyle}>{errors.position}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Salary Expectation *</label>
                    <input 
                      type="number" 
                      name="salary" 
                      className={`form-input ${errors.salary ? 'error' : ''}`}
                      min="1" 
                      value={formData.salary} 
                      onChange={handleChange}
                      placeholder="Expected salary"
                    />
                    {errors.salary && <span style={errorMessageStyle}>{errors.salary}</span>}
                  </div>
                </div>

                <button 
                  type="submit"
                  className="submit-button" 
                  disabled={isLoading}
                >
                  {isLoading && <div className="loading-spinner"></div>}
                  {isLoading ? 'Submitting...' : 'Submit & Go to Next Stage'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}