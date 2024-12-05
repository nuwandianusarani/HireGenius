import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EducationDetails = () => {
  const [education, setEducation] = useState({
    year: "",
    stream: "",
    subjects: [],
    degree: { type: "", gpa: "" },
    certificates: [],
  });

  const [step, setStep] = useState(1);

  const handleInputChange = (key, value) => {
    setEducation((prev) => ({ ...prev, [key]: value }));
  };

  const handleNestedChange = (section, index, key, value) => {
    setEducation((prev) => {
      const updated = [...prev[section]];
      updated[index][key] = value;
      return { ...prev, [section]: updated };
    });
  };

  const addEntry = (section, defaultEntry) => {
    setEducation((prev) => ({
      ...prev,
      [section]: [...prev[section], defaultEntry],
    }));
  };

  const handleSubmit = () => {
    alert("Education profile saved successfully!");
    console.log(education);
  
    // Unlock the next level in localStorage
    const currentLevel = parseInt(localStorage.getItem("unlockedLevel")) || 1;
    const nextLevel = Math.max(currentLevel, 2); 
    localStorage.setItem("unlockedLevel", nextLevel);
  
    window.location.href = "/stage-1"; 
  };

  const steps = [
    {
      title: "Enter Advance Level Exam Year",
      content: (
        <>
          <input
            type="number"
            className="form-control w-50 mx-auto mt-3 text-center"
            placeholder="Enter Year"
            value={education.year}
            onChange={(e) => handleInputChange("year", e.target.value)}
            required
          />
          <div className="d-flex justify-content-center">
            <button
                className="btn btn-primary mt-3"
                onClick={() => setStep(2)}
                disabled={!education.year}
            >
                Next
            </button>
          </div>
        </>
      ),
    },
    {
      title: "Select Advance Level Exam Stream",
      content: (
        <>
            <div className="d-flex justify-content-center mt-3">
                {["Arts", "Engineering Technology", "Biosystems Technology", "Maths", "Bio Science"].map((stream) => (
                    <button
                    key={stream}
                    className={`btn mx-2 ${
                        education.stream === stream
                        ? "btn-primary"
                        : stream === "Arts"
                        ? "btn-danger"
                        : stream === "Engineering Technology"
                        ? "btn-success"
                        : stream === "Biosystems Technology"
                        ? "btn-warning"
                        : stream === "Maths"
                        ? "btn-info"
                        : "btn-dark"
                    }`}
                    onClick={() => {
                        handleInputChange("stream", stream);
                        setStep(3);
                    }}
                    >
                    {/* Conditionally render Icons*/}
                    {stream === "Arts" && <i className="ri-palette-line me-2"></i>}
                    {stream === "Engineering Technology" && <i className="ri-cpu-line me-2"></i>}
                    {stream === "Biosystems Technology" && <i className="ri-flask-line me-2"></i>}
                    {stream === "Maths" && <i className="ri-function-line me-2"></i>}
                    {stream === "Bio Science" && <i className="ri-team-line me-2"></i>}
                    {stream}
                    </button>
                ))}
            </div>

        </>
      ),
    },
    {
      title: "Enter A/L Subjects & Grades",
      content: (
        <>
          {education.subjects.map((subject, index) => (
            <div key={index} className="row mt-3">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Subject"
                  value={subject.subject}
                  onChange={(e) =>
                    handleNestedChange("subjects", index, "subject", e.target.value)
                  }
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Grade"
                  value={subject.grade}
                  onChange={(e) =>
                    handleNestedChange("subjects", index, "grade", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-center">
            <button
                className="btn btn-outline-success mt-3"
                onClick={() => addEntry("subjects", { subject: "", grade: "" })}
            >
                Add Subject
            </button>
            &nbsp;&nbsp;&nbsp;
            <button
                className="btn btn-primary mt-3"
                onClick={() => setStep(4)}
                disabled={
                education.subjects.length === 0 ||
                !education.subjects.every((s) => s.subject && s.grade)
                }
            >
                Next
            </button>
          </div>
        </>
      ),
    },
    {
      title: "Degree/Diploma Details (Optional)",
      content: (
        <>
          <input
            type="text"
            className="form-control w-50 mx-auto mt-3"
            placeholder="Degree/Diploma Type (e.g., BSc, HND)"
            value={education.degree.type}
            onChange={(e) => handleInputChange("degree", { ...education.degree, type: e.target.value })}
          />
          <input
            type="text"
            className="form-control w-50 mx-auto mt-3"
            placeholder="GPA"
            value={education.degree.gpa}
            onChange={(e) => handleInputChange("degree", { ...education.degree, gpa: e.target.value })}
          />
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary mt-3" onClick={() => setStep(5)}>
                Next
            </button>
          </div>
        </>
      ),
    },
    {
      title: "Certificate Details (Optional)",
      content: (
        <>
          {education.certificates.map((certificate, index) => (
            <div key={index} className="row mt-3">
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Certificate Name"
                  value={certificate.name}
                  onChange={(e) =>
                    handleNestedChange("certificates", index, "name", e.target.value)
                  }
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Issuer"
                  value={certificate.issuer}
                  onChange={(e) =>
                    handleNestedChange("certificates", index, "issuer", e.target.value)
                  }
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Year"
                  value={certificate.year}
                  onChange={(e) =>
                    handleNestedChange("certificates", index, "year", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-center">
            <button
                className="btn btn-outline-success mt-3"
                onClick={() => addEntry("certificates", { name: "", issuer: "", year: "" })}
            >
                Add Certificate
            </button>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-success mt-3" onClick={handleSubmit}>
                Submit
            </button>
          </div>
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        backgroundImage: "url('./images/educational-game-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        height: "100vh",
      }}
    >

    <div
        style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        }}
    ></div>

    <div
        style={{
            position: "relative",
            textAlign:"center",
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#ffffff",
            textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
    >
        HireFlow
    </div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <h4 className="text-center">Level 1 : Education</h4>
        <div className="mt-5">
          <h4 className="text-center">{steps[step - 1].title}</h4>
          {steps[step - 1].content}
        </div>
        <div className="mt-5">
            <div className="card bg-dark text-light">
                <div>
                <h3 className="my-3 text-center">
                    <i className="ri-graduation-cap-fill"></i> Your Educational Profile
                </h3>
                <hr />
                </div>
                <div className="card-body">
                <div className="row">
                    {/* Left Column: A/L Details */}
                    <div
                    className="col-md-6 border-end border-secondary pe-4"
                    style={{ minHeight: "100%" }}
                    >
                    <h5 className="mb-3">
                        <i className="ri-calendar-event-fill me-2"></i> Advance Level Examination
                    </h5>
                    <div className="mx-5">
                        <p>
                            <i className="ri-calendar-line me-2"></i> <strong>Year:</strong>{" "}
                            {education.year}
                        </p>
                        <p>
                            <i className="ri-stack-line me-2"></i> <strong>Stream:</strong>{" "}
                            {education.stream}
                        </p>

                        <h6>
                            <i className="ri-bookmark-3-line me-2"></i> Subjects:
                        </h6>
                        <ul>
                            {education.subjects.map((subject, index) => (
                            <li key={index}>
                                {subject.subject} - {subject.grade}
                            </li>
                            ))}
                        </ul>
                     </div>
                    </div>

                    {/* Right Column: Other Details */}
                    <div className="col-md-6 ps-4">
                    {education.degree.type && (
                        <div className="mb-4">
                        <h5>
                            <i className="ri-book-line me-2"></i> Degree Details
                        </h5>
                        <div className="mx-5">
                            <p>
                                <i className="ri-medal-fill me-2"></i> <strong>Degree:</strong>{" "}
                                {education.degree.type}
                            </p>
                            <p>
                                <i className="ri-bar-chart-line me-2"></i> <strong>GPA:</strong>{" "}
                                {education.degree.gpa}
                            </p>
                        </div>
                        </div>
                    )}
                    {education.certificates.length > 0 && (
                        <div>
                        <h6>
                            <i className="ri-file-copy-line me-2"></i> Certificates
                        </h6>
                        <div className="mx-5">
                            <ul>
                                {education.certificates.map((cert, index) => (
                                <li key={index}>
                                    <i className="ri-award-line me-2"></i>
                                    {cert.name} ({cert.year}) - Issuer: {cert.issuer}
                                </li>
                                ))}
                            </ul>
                        </div>
                        </div>
                    )}
                    </div>
                </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default EducationDetails;
