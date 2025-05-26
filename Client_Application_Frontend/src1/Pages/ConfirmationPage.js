

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
//         const candidateResponse = await axios.get(
//           `http://localhost:5000/candidates/candidatesByGeneratedId/${candidateId}`
//         );
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
//     <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      
//       {/* Navbar */}
//       <div style={{ backgroundColor: "#4A90E2", padding: "15px", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h2 style={{ margin: 0 }}>IFS</h2>
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <p style={{ marginRight: "15px" }}>My Applications</p>
//           <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User Icon" width="30" />
//         </div>
//       </div>

//       <div style={{ display: "flex", maxWidth: "1100px", margin: "auto", padding: "20px" }}>
        
//         {/* Left Section - Job Details */}
//         <div style={{ flex: "3", padding: "20px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0px 0px 10px #ddd" }}>
          
//           {/* Job Title & Progress Bar */}
//           <h2 style={{ color: "#333" }}>{job.jobTitle} - {job.company}</h2>
//           <p style={{ color: "#777" }}>{job.location}</p>
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "20px 0" }}>
//             <span style={{ color: "green", fontWeight: "bold" }}>✔ New</span>
//             <span style={{ color: "#777" }}>2 In Review</span>
//             <span style={{ color: "#777" }}>3 Interview</span>
//             <span style={{ color: "#777" }}>4 Offered</span>
//           </div>

//           {/* Job Details Section */}
//           <div style={{ borderTop: "1px solid #ddd", paddingTop: "15px" }}>
//             <h3>Job Details</h3>
//             <p><strong>Company:</strong> {job.company}</p>
//             <p><strong>Location:</strong> {job.location}</p>
//             <h4>Company Description</h4>
//             <p>{job.description || "No description available"}</p>
//           </div>

//           {/* Candidate Details Section */}
//           <div style={{ marginTop: "20px", borderTop: "1px solid #ddd", paddingTop: "15px" }}>
//             <h3>Candidate Information</h3>
//             <p><strong>Name:</strong> {candidate.firstName} {candidate.lastName}</p>
//             <p><strong>Email:</strong> {candidate.email}</p>
//             <p><strong>LinkedIn:</strong> <a href={candidate.linkedIn} target="_blank" rel="noopener noreferrer">{candidate.linkedIn}</a></p>
//             <p><strong>GitHub:</strong> <a href={candidate.github} target="_blank" rel="noopener noreferrer">{candidate.github}</a></p>
//           </div>

//         </div>

//         {/* Right Sidebar */}
//         <div style={{ flex: "1", marginLeft: "20px" }}>
          
//           {/* My Applications Section */}
//           <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0px 0px 10px #ddd" }}>
//             <h4>My Applications</h4>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #ddd" }}>
//               <p>{job.jobTitle}</p>
//               <span style={{ backgroundColor: "#f4c542", color: "#fff", padding: "5px 10px", borderRadius: "5px" }}>New</span>
//             </div>
//           </div>

//           {/* Resume Upload Section */}
//           <div style={{ backgroundColor: "#fff", padding: "15px", marginTop: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px #ddd", textAlign: "center" }}>
//             <h4>Resume</h4>
//             <input type="file" style={{ display: "block", margin: "10px auto" }} />
//             {candidate.resume ? (
//               <div>
//                 <p><strong>Uploaded Resume:</strong> {candidate.resume}</p>
//                 <button style={{ marginRight: "10px", background: "#4A90E2", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>📥 Download</button>
//                 <button style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>❌ Delete</button>
//               </div>
//             ) : (
//               <p>No resume uploaded yet</p>
//             )}
//           </div>

//           {/* Attachments Section */}
//           <div style={{ backgroundColor: "#fff", padding: "15px", marginTop: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px #ddd", textAlign: "center" }}>
//             <h4>Attachments</h4>
//             <p>No attachments uploaded</p>
//           </div>
//         </div>

//       </div>

//       <p style={{ textAlign: "center", marginTop: "20px", fontSize: "12px" }}>
//         You can find the details of your application processing in the <a href="#" style={{ color: "#4A90E2" }}>privacy policy</a>.
//       </p>

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
  const applicationStages = ["New", "In Review", "Interview", "Offered"];

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
    return (
      <div className="flex items-center justify-center min-h-screen text-[#DBD8E3]">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }

  // Current status is "New"
  const currentStageIndex = 0;

  const handleStatusClick = (index) => {
    if (index !== 0) {
      alert("You are not allowed to access this status yet.");
    }
  };

  return (
    <div className="min-h-screen bg-[#2A2438] text-[#DBD8E3]">
      
      {/* Navbar */}
      <div className="bg-[#5C5470] py-4 px-6 flex justify-between items-center text-white">
        <h2 className="text-xl font-bold">IFS</h2>
        <div className="flex items-center">
          <p className="mr-4">My Applications</p>
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User Icon" width="30" />
        </div>
      </div>

      {/* Application Status Progress Bar - Below Navbar */}
      <div className="bg-[#3A3340] py-4 px-6 shadow-lg flex justify-center">
        <div className="flex space-x-6 items-center">
          {applicationStages.map((stage, index) => (
            <div key={stage} className="flex items-center space-x-2">
              <button
                onClick={() => handleStatusClick(index)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold 
                  ${index === currentStageIndex ? "bg-[#DBD8E3] text-black" : "bg-[#5C5470] text-white cursor-not-allowed"}
                `}
              >
                {stage}
              </button>
              {index < applicationStages.length - 1 && (
                <div className="w-10 h-1 bg-[#5C5470]"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row gap-6">
        
        {/* Left Section - Job & Candidate Details */}
        <div className="flex-1 p-6 bg-[#352F44] shadow-lg rounded-lg">
          
          {/* Job Details */}
          <h2 className="text-3xl font-bold text-[#DBD8E3]">{job.jobTitle} - {job.company}</h2>
          <p className="text-[#BDB7C6]">{job.jobLocation}</p>

          <div className="mt-4 border-t border-gray-500 pt-4">
            <h3 className="text-xl font-semibold">Job Information</h3>
            <p><strong>Department:</strong> {job.jobDepartment}</p>
            <p><strong>Posted Date:</strong> {job.jobPostedDate}</p>
            <p><strong>Ends Date:</strong> {job.jobEndsDate}</p>
            <p><strong>Type:</strong> {job.jobType}</p>
            <p><strong>Qualifications:</strong> {job.qualifications || "Not provided"}</p>
            <p><strong>Skills:</strong> {job.skills || "Not listed"}</p>
            <p className="whitespace-pre-wrap"><strong>Description:</strong> {job.jobDescription || "N/A"}</p>
          </div>

          {/* Candidate Details */}
          <div className="mt-6 border-t border-gray-500 pt-4">
            <h3 className="text-xl font-semibold">Candidate Information</h3>
            <p><strong>Name:</strong> {candidate.firstName} {candidate.lastName}</p>
            <p><strong>Email:</strong> {candidate.email}</p>
            <p><strong>Contact Number:</strong> {candidate.contactNumber || "N/A"}</p>
            <p><strong>LinkedIn:</strong> <a href={candidate.linkedIn} className="text-blue-400 underline">{candidate.linkedIn || "Not provided"}</a></p>
            <p><strong>GitHub:</strong> <a href={candidate.github} className="text-blue-400 underline">{candidate.github || "Not provided"}</a></p>
            <p><strong>Twitter:</strong> <a href={candidate.twitter} className="text-blue-400 underline">{candidate.twitter || "Not provided"}</a></p>
            <p><strong>Website:</strong> <a href={candidate.website} className="text-blue-400 underline">{candidate.website || "Not provided"}</a></p>
            <p><strong>Experience:</strong> {candidate.noOfYearsExperience || "N/A"} years</p>
            <p><strong>Employer Choice:</strong> {candidate.employerChoice || "N/A"}</p>
            <p><strong>Salary Expectation:</strong> {candidate.salaryRange || "Not specified"}</p>
            <p><strong>Vacancy Source:</strong> {candidate.vacancySource || "Not specified"}</p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-1/3">
          
          {/* Resume Upload Section */}
          <div className="bg-[#352F44] p-6 shadow-lg rounded-lg mb-4 text-center">
            <h4 className="text-xl font-bold">Resume</h4>
            <input type="file" className="block mx-auto mt-2 text-white" />
            {candidate.resume ? (
              <div className="mt-3">
                <p><strong>Uploaded Resume:</strong> {candidate.resume}</p>
                <button className="mr-2 px-4 py-2 bg-[#5C5470] text-white rounded shadow-md">📥 Download</button>
                <button className="px-4 py-2 bg-red-500 text-white rounded shadow-md">❌ Delete</button>
              </div>
            ) : (
              <p className="text-gray-400">No resume uploaded yet</p>
            )}
          </div>

          {/* Privacy Policy */}
          <div className="bg-[#352F44] p-6 shadow-lg rounded-lg text-center">
            <h4 className="text-xl font-bold">Privacy Policy</h4>
            <p>{candidate.privacyPolicy === "true" ? "✅ Accepted" : "❌ Not Accepted"}</p>
          </div>
        </div>

      </div>

      <p className="text-center text-[#BDB7C6] mt-6 text-sm">
        You can find the details of your application processing in the <a href="#" className="text-blue-400">privacy policy</a>.
      </p>

    </div>
  );
};

export default ConfirmationPage;


