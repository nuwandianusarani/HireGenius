import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CandidateView.css";

const App = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Fetch candidates from the backend
    axios
      .get("http://localhost:5000/candidates")
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching candidates:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Candidates</h1>
      <div className="candidates-grid">
        {candidates.map((candidate) => (
          <div key={candidate._id} className="candidate-card">
            <h2>
              {candidate.firstName} {candidate.lastName}
            </h2>
            <p><strong>Email:</strong> {candidate.email}</p>
            <p><strong>LinkedIn:</strong> <a href={candidate.linkedIn} target="_blank" rel="noopener noreferrer">{candidate.linkedIn}</a></p>
            <p><strong>GitHub:</strong> <a href={candidate.github} target="_blank" rel="noopener noreferrer">{candidate.github}</a></p>
            <p><strong>Message:</strong> {candidate.message}</p>
            <p>Vacancy Source: {candidate.vacancySource}</p>
            <p>Employer Choice: {candidate.employerChoice}</p>
            <p>Employer Expectations: {candidate.employerExpectations}</p>
            <p>Consent: {candidate.consent}</p>
            <p>Privacy Policy: {candidate.privacyPolicy}</p>
            <p>Job Title: {candidate.jobTitle}</p>
            <p><strong>Salary Range:</strong> {candidate.salaryRange}</p>
            <h3>Experience</h3>
            {candidate.experience.map((exp) => (
              <div key={exp.id}>
                <p><strong>Title:</strong> {exp.title}</p>
                <p><strong>Company:</strong> {exp.company}</p>
                <p><strong>Location:</strong> {exp.officeLocation}</p>
                <p><strong>From:</strong> {exp.from}</p>
                <p><strong>To:</strong> {exp.to}</p>
                <p><strong>Description:</strong> {exp.description}</p>
              </div>
            ))}
            <h3>Education</h3>
            {candidate.education.map((edu) => (
              <div key={edu.id}>
                <p><strong>Institution:</strong> {edu.institution}</p>
                <p><strong>Degree:</strong> {edu.degree}</p>
                <p><strong>Major:</strong> {edu.major}</p>
                <p><strong>Location:</strong> {edu.location}</p>
                <p><strong>From:</strong> {edu.from}</p>
                <p><strong>To:</strong> {edu.to}</p>
              </div>
            ))}
            <p><strong>Resume:</strong> <a href={`http://localhost:5000/uploads/cv/${candidate.resume}`} target="_blank" rel="noopener noreferrer">{candidate.resume}</a></p>
            <p><strong>Transcript:</strong> <a href={`http://localhost:5000/uploads/transcripts/${candidate.transcript}`} target="_blank" rel="noopener noreferrer">{candidate.resume}</a></p>
            <h3>Soft Skills</h3>
            <ul>
              {candidate.soft_skills &&
                candidate.soft_skills.map((skill, index) => (
                  <li key={index}>
                    <p>Skill: {skill.skill}</p>
                    <p>Count: {skill.count}</p>
                  </li>
                ))}
            </ul>
            <p>Similarity Score: {candidate.similarity_score}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
