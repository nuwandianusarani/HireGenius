// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const ConfirmationPage = () => {
//   const { candidateId, jobID } = useParams();
//   const [candidate, setCandidate] = useState(null);
//   const [job, setJob] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const candidateResponse = await axios.get(`http://localhost:5000/candidates/candidatesByGeneratedId/${candidateId}`);
//         setCandidate(candidateResponse.data);

//         const jobResponse = await axios.get(`http://localhost:5000/jobs/${jobID}`);
//         setJob(jobResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [candidateId, jobID]);

//   if (!candidate || !job) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Application Submitted Successfully!</h2>
//       <h3>Candidate Information:</h3>
//       <p><strong>Name:</strong> {candidate.firstName} {candidate.lastName}</p>
//       <p><strong>Email:</strong> {candidate.email}</p>
//       <p><strong>LinkedIn:</strong> {candidate.linkedIn}</p>
//       <p><strong>GitHub:</strong> {candidate.github}</p>

//       <h3>Job Details:</h3>
//       <p><strong>Job Title:</strong> {job.jobTitle}</p>
//       <p><strong>Company:</strong> {job.company}</p>
//       <p><strong>Location:</strong> {job.location}</p>

//       <h4>Thank you for applying!</h4>
//     </div>
//   );
// };

// export default ConfirmationPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ConfirmationPage = () => {
  const { candidateId, jobID } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidateResponse = await axios.get(
          `http://localhost:5000/candidates/candidatesByGeneratedId/${candidateId}`
        );
        setCandidate(candidateResponse.data);

        const jobResponse = await axios.get(`http://localhost:5000/jobs/${jobID}`);
        setJob(jobResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [candidateId, jobID]);

  if (!candidate || !job) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      
      {/* Navbar */}
      <div style={{ backgroundColor: "#4A90E2", padding: "15px", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>IFS</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginRight: "15px" }}>My Applications</p>
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User Icon" width="30" />
        </div>
      </div>

      <div style={{ display: "flex", maxWidth: "1100px", margin: "auto", padding: "20px" }}>
        
        {/* Left Section - Job Details */}
        <div style={{ flex: "3", padding: "20px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0px 0px 10px #ddd" }}>
          
          {/* Job Title & Progress Bar */}
          <h2 style={{ color: "#333" }}>{job.jobTitle} - {job.company}</h2>
          <p style={{ color: "#777" }}>{job.location}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "20px 0" }}>
            <span style={{ color: "green", fontWeight: "bold" }}>✔ New</span>
            <span style={{ color: "#777" }}>2 In Review</span>
            <span style={{ color: "#777" }}>3 Interview</span>
            <span style={{ color: "#777" }}>4 Offered</span>
          </div>

          {/* Job Details Section */}
          <div style={{ borderTop: "1px solid #ddd", paddingTop: "15px" }}>
            <h3>Job Details</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <h4>Company Description</h4>
            <p>{job.description || "No description available"}</p>
          </div>

          {/* Candidate Details Section */}
          <div style={{ marginTop: "20px", borderTop: "1px solid #ddd", paddingTop: "15px" }}>
            <h3>Candidate Information</h3>
            <p><strong>Name:</strong> {candidate.firstName} {candidate.lastName}</p>
            <p><strong>Email:</strong> {candidate.email}</p>
            <p><strong>LinkedIn:</strong> <a href={candidate.linkedIn} target="_blank" rel="noopener noreferrer">{candidate.linkedIn}</a></p>
            <p><strong>GitHub:</strong> <a href={candidate.github} target="_blank" rel="noopener noreferrer">{candidate.github}</a></p>
          </div>

        </div>

        {/* Right Sidebar */}
        <div style={{ flex: "1", marginLeft: "20px" }}>
          
          {/* My Applications Section */}
          <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0px 0px 10px #ddd" }}>
            <h4>My Applications</h4>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #ddd" }}>
              <p>{job.jobTitle}</p>
              <span style={{ backgroundColor: "#f4c542", color: "#fff", padding: "5px 10px", borderRadius: "5px" }}>New</span>
            </div>
          </div>

          {/* Resume Upload Section */}
          <div style={{ backgroundColor: "#fff", padding: "15px", marginTop: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px #ddd", textAlign: "center" }}>
            <h4>Resume</h4>
            <input type="file" style={{ display: "block", margin: "10px auto" }} />
            {candidate.resume ? (
              <div>
                <p><strong>Uploaded Resume:</strong> {candidate.resume}</p>
                <button style={{ marginRight: "10px", background: "#4A90E2", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>📥 Download</button>
                <button style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>❌ Delete</button>
              </div>
            ) : (
              <p>No resume uploaded yet</p>
            )}
          </div>

          {/* Attachments Section */}
          <div style={{ backgroundColor: "#fff", padding: "15px", marginTop: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px #ddd", textAlign: "center" }}>
            <h4>Attachments</h4>
            <p>No attachments uploaded</p>
          </div>
        </div>

      </div>

      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "12px" }}>
        You can find the details of your application processing in the <a href="#" style={{ color: "#4A90E2" }}>privacy policy</a>.
      </p>

    </div>
  );
};

export default ConfirmationPage;

