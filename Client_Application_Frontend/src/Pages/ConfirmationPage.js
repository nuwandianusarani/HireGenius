

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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const ConfirmationPage = () => {
//   const { candidateId, jobID } = useParams();
//   const [candidate, setCandidate] = useState(null);
//   const [job, setJob] = useState(null);
//   const applicationStages = ["New", "In Review", "Interview", "Offered"];

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
//     return (
//       <div className="flex items-center justify-center min-h-screen text-[#DBD8E3]">
//         <p className="text-xl font-bold">Loading...</p>
//       </div>
//     );
//   }

//   // Current status is "New"
//   const currentStageIndex = 0;

//   const handleStatusClick = (index) => {
//     if (index !== 0) {
//       alert("You are not allowed to access this status yet.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#2A2438] text-[#DBD8E3]">
      
//       {/* Navbar */}
//       <div className="bg-[#5C5470] py-4 px-6 flex justify-between items-center text-white">
//         <h2 className="text-xl font-bold">HireGenius</h2>
//         <div className="flex items-center">
//           <p className="mr-4">My Applications</p>
//           <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User Icon" width="30" />
//         </div>
//       </div>

//       {/* Application Status Progress Bar - Below Navbar */}
//       <div className="bg-[#3A3340] py-4 px-6 shadow-lg flex justify-center">
//         <div className="flex space-x-6 items-center">
//           {applicationStages.map((stage, index) => (
//             <div key={stage} className="flex items-center space-x-2">
//               <button
//                 onClick={() => handleStatusClick(index)}
//                 className={`px-4 py-2 rounded-lg text-sm font-semibold 
//                   ${index === currentStageIndex ? "bg-[#DBD8E3] text-black" : "bg-[#5C5470] text-white cursor-not-allowed"}
//                 `}
//               >
//                 {stage}
//               </button>
//               {index < applicationStages.length - 1 && (
//                 <div className="w-10 h-1 bg-[#5C5470]"></div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row gap-6">
        
//         {/* Left Section - Job & Candidate Details */}
//         <div className="flex-1 p-6 bg-[#352F44] shadow-lg rounded-lg">
          
//           {/* Job Details */}
//           <h2 className="text-3xl font-bold text-[#DBD8E3]">{job.jobTitle} - {job.company}</h2>
//           <p className="text-[#BDB7C6]">{job.jobLocation}</p>

//           <div className="mt-4 border-t border-gray-500 pt-4">
//             <h3 className="text-xl font-semibold">Job Information</h3>
//             <p><strong>Department:</strong> {job.jobDepartment}</p>
//             <p><strong>Posted Date:</strong> {job.jobPostedDate}</p>
//             <p><strong>Ends Date:</strong> {job.jobEndsDate}</p>
//             <p><strong>Type:</strong> {job.jobType}</p>
//             <p><strong>Qualifications:</strong> {job.qualifications || "Not provided"}</p>
//             <p><strong>Skills:</strong> {job.skills || "Not listed"}</p>
//             <p className="whitespace-pre-wrap"><strong>Description:</strong> {job.jobDescription || "N/A"}</p>
//           </div>

//           {/* Candidate Details */}
//           <div className="mt-6 border-t border-gray-500 pt-4">
//             <h3 className="text-xl font-semibold">Candidate Information</h3>
//             <p><strong>Name:</strong> {candidate.firstName} {candidate.lastName}</p>
//             <p><strong>Email:</strong> {candidate.email}</p>
//             <p><strong>Contact Number:</strong> {candidate.contactNumber || "N/A"}</p>
//             <p><strong>LinkedIn:</strong> <a href={candidate.linkedIn} className="text-blue-400 underline">{candidate.linkedIn || "Not provided"}</a></p>
//             <p><strong>GitHub:</strong> <a href={candidate.github} className="text-blue-400 underline">{candidate.github || "Not provided"}</a></p>
//             <p><strong>Twitter:</strong> <a href={candidate.twitter} className="text-blue-400 underline">{candidate.twitter || "Not provided"}</a></p>
//             <p><strong>Website:</strong> <a href={candidate.website} className="text-blue-400 underline">{candidate.website || "Not provided"}</a></p>
//             <p><strong>Experience:</strong> {candidate.noOfYearsExperience || "N/A"} years</p>
//             <p><strong>Employer Choice:</strong> {candidate.employerChoice || "N/A"}</p>
//             <p><strong>Salary Expectation:</strong> {candidate.salaryRange || "Not specified"}</p>
//             <p><strong>Vacancy Source:</strong> {candidate.vacancySource || "Not specified"}</p>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="w-full md:w-1/3">
          
//           {/* Resume Upload Section */}
//           <div className="bg-[#352F44] p-6 shadow-lg rounded-lg mb-4 text-center">
//             <h4 className="text-xl font-bold">Resume</h4>
//             <input type="file" className="block mx-auto mt-2 text-white" />
//             {candidate.resume ? (
//               <div className="mt-3">
//                 <p><strong>Uploaded Resume:</strong> {candidate.resume}</p>
//                 <button className="mr-2 px-4 py-2 bg-[#5C5470] text-white rounded shadow-md">📥 Download</button>
//                 <button className="px-4 py-2 bg-red-500 text-white rounded shadow-md">❌ Delete</button>
//               </div>
//             ) : (
//               <p className="text-gray-400">No resume uploaded yet</p>
//             )}
//           </div>

//           {/* Privacy Policy */}
//           <div className="bg-[#352F44] p-6 shadow-lg rounded-lg text-center">
//             <h4 className="text-xl font-bold">Privacy Policy</h4>
//             <p>{candidate.privacyPolicy === "true" ? "✅ Accepted" : "❌ Not Accepted"}</p>
//           </div>
//         </div>

//       </div>

//       <p className="text-center text-[#BDB7C6] mt-6 text-sm">
//         You can find the details of your application processing in the <a href="/" className="text-blue-400">privacy policy</a>.
//       </p>

//     </div>
//   );
// };

// export default ConfirmationPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const { candidateId, jobID } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [job, setJob] = useState(null);
  const applicationStages = ["New", "In Review", "Interview", "Offered"];
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b69] to-[#0f0c29] text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      {/* Enhanced Navbar with Glass Morphism */}
      <div className="relative bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-xl border-b border-white/20 py-6 px-8 flex justify-between items-center shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12"></div>
        <div className="relative z-10 flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl transform rotate-6 hover:rotate-12 transition-all duration-300">
            <span className="text-white font-bold text-xl">💼</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">
            HireGenius ✨
          </h2>
        </div>
        <div className="relative z-10 flex items-center space-x-6">
          <div className="flex items-center space-x-3 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 px-6 py-3 rounded-full backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-300">
            <span className="text-2xl">📋</span>
            <p className="font-semibold text-emerald-100">My Applications</p>
          </div>
          <div className="w-14 h-14 bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 rounded-full p-1 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
              alt="User Icon" 
              className="w-full h-full rounded-full object-cover border-2 border-white/30"
            />
          </div>
          <button
            className="group flex items-center gap-3 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 backdrop-blur-md text-white px-8 py-4 rounded-2xl hover:from-indigo-500/50 hover:to-purple-500/50 transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl"
            onClick={() => navigate(-1)}
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">← Go Back</span>
          </button>
        </div>
      </div>

      {/* Ultra-Modern Progress Bar */}
      <div className="relative bg-gradient-to-r from-slate-800/50 via-gray-800/50 to-slate-800/50 backdrop-blur-xl py-10 px-6 border-b border-white/10">
        <div className="flex justify-center">
          <div className="flex space-x-6 items-center bg-gradient-to-r from-black/40 to-gray-900/40 px-12 py-8 rounded-3xl backdrop-blur-lg border border-white/20 shadow-2xl">
            {applicationStages.map((stage, index) => (
              <div key={stage} className="flex items-center space-x-6">
                <div className="flex flex-col items-center space-y-3">
                  <button
                    onClick={() => handleStatusClick(index)}
                    className={`relative px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-500 transform hover:scale-110 shadow-xl
                      ${index === currentStageIndex 
                        ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white shadow-cyan-400/50 animate-pulse" 
                        : index < currentStageIndex
                        ? "bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600 text-white shadow-emerald-400/50"
                        : "bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 cursor-not-allowed opacity-60"
                      }
                    `}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl opacity-50"></div>
                    <span className="relative z-10 flex items-center space-x-3">
                      {index < currentStageIndex && <span className="text-lg">✅</span>}
                      {index === currentStageIndex && <span className="text-lg animate-spin">🔄</span>}
                      <span>{stage}</span>
                    </span>
                  </button>
                </div>
                {index < applicationStages.length - 1 && (
                  <div className={`w-16 h-3 rounded-full transition-all duration-700 ${
                    index < currentStageIndex 
                      ? "bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 shadow-lg shadow-emerald-400/30" 
                      : "bg-gradient-to-r from-gray-600 to-gray-700"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-12 flex flex-col lg:flex-row gap-10 relative z-10">
        
        {/* Left Section with Advanced Glass Morphism */}
        <div className="flex-1 p-10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/20 relative overflow-hidden hover:shadow-3xl transition-all duration-500">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-violet-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          
          {/* Enhanced Job Header */}
          <div className="relative z-10 mb-10">
            <div className="flex items-start space-x-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-xl transform rotate-6 hover:rotate-12 transition-all duration-300">
                <span className="text-3xl">🚀</span>
              </div>
              <div>
                <h2 className="text-5xl font-black bg-gradient-to-r from-violet-300 via-pink-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent leading-tight mb-2">
                  {job.jobTitle}
                </h2>
                <p className="text-2xl text-purple-200 font-bold flex items-center space-x-2">
                  <span>🏢</span>
                  <span>{job.company}</span>
                </p>
                <div className="flex items-center space-x-3 mt-3">
                  <span className="text-xl">📍</span>
                  <p className="text-cyan-200 text-lg font-medium">{job.jobLocation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ultra-Modern Job Information Card */}
          <div className="relative z-10 mb-10 p-8 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-xl">
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-3xl">📊</span>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Job Information</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl border border-cyan-400/30">
                  <span className="text-2xl">🏢</span>
                  <div><strong className="text-cyan-200">Department:</strong> <span className="text-white">{job.jobDepartment}</span></div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl border border-emerald-400/30">
                  <span className="text-2xl">📅</span>
                  <div><strong className="text-emerald-200">Posted:</strong> <span className="text-white">{job.jobPostedDate}</span></div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl border border-orange-400/30">
                  <span className="text-2xl">⏰</span>
                  <div><strong className="text-orange-200">Ends:</strong> <span className="text-white">{job.jobEndsDate}</span></div>
                </div>
              </div>
              <div className="space-y-5">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-2xl border border-purple-400/30">
                  <span className="text-2xl">💼</span>
                  <div><strong className="text-purple-200">Type:</strong> <span className="text-white">{job.jobType}</span></div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-2xl border border-pink-400/30">
                  <span className="text-2xl">🎓</span>
                  <div><strong className="text-pink-200">Qualifications:</strong> <span className="text-white">{job.qualifications || "Not provided"}</span></div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-2xl border border-indigo-400/30">
                  <span className="text-2xl">⚡</span>
                  <div><strong className="text-indigo-200">Skills:</strong> <span className="text-white">{job.skills || "Not listed"}</span></div>
                </div>
              </div>
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-slate-800/50 to-gray-800/50 backdrop-blur-lg rounded-2xl border border-white/20">
              <div className="flex items-start space-x-4">
                <span className="text-2xl mt-1">📝</span>
                <div>
                  <strong className="text-yellow-300 text-xl">Description:</strong>
                  <p className="text-gray-200 mt-3 leading-relaxed text-lg">{job.jobDescription || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Candidate Information Card */}
          <div className="relative z-10 p-8 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-xl">
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-3xl">👤</span>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">Candidate Information</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-2xl border border-violet-400/30">
                  <span className="text-2xl">🧑‍💼</span>
                  <div><strong className="text-violet-200">Name:</strong> <span className="text-white">{candidate.firstName} {candidate.lastName}</span></div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl border border-blue-400/30">
                  <span className="text-2xl">📧</span>
                  <div><strong className="text-blue-200">Email:</strong> <span className="text-white">{candidate.email}</span></div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl border border-emerald-400/30">
                  <span className="text-2xl">📱</span>
                  <div><strong className="text-emerald-200">Contact:</strong> <span className="text-white">{candidate.contactNumber || "N/A"}</span></div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl border border-orange-400/30">
                  <span className="text-2xl">💼</span>
                  <div><strong className="text-orange-200">Experience:</strong> <span className="text-white">{candidate.noOfYearsExperience || "N/A"} years</span></div>
                </div>
              </div>
              <div className="space-y-5">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-2xl border border-pink-400/30">
                  <span className="text-2xl">🏠</span>
                  <div><strong className="text-pink-200">Preference:</strong> <span className="text-white">{candidate.employerChoice || "N/A"}</span></div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-2xl border border-green-400/30">
                  <span className="text-2xl">💰</span>
                  <div><strong className="text-green-200">Salary:</strong> <span className="text-white">{candidate.salaryRange || "Not specified"}</span></div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-400/30">
                  <span className="text-2xl">🔍</span>
                  <div><strong className="text-cyan-200">Source:</strong> <span className="text-white">{candidate.vacancySource || "Not specified"}</span></div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Social Links */}
            <div className="mt-8 p-6 bg-gradient-to-r from-slate-800/50 to-gray-800/50 backdrop-blur-lg rounded-2xl border border-white/20">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-2xl">🌐</span>
                <strong className="text-yellow-300 text-xl">Professional Links:</strong>
              </div>
              <div className="flex flex-wrap gap-4">
                {candidate.linkedIn && (
                  <a href={candidate.linkedIn} className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600/30 to-blue-700/30 hover:from-blue-600/50 hover:to-blue-700/50 rounded-xl transition-all duration-300 text-blue-300 hover:text-blue-200 border border-blue-500/30 shadow-lg transform hover:scale-105">
                    <span className="text-xl">💼</span>
                    <span className="font-semibold">LinkedIn</span>
                  </a>
                )}
                {candidate.github && (
                  <a href={candidate.github} className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-gray-600/30 to-gray-700/30 hover:from-gray-600/50 hover:to-gray-700/50 rounded-xl transition-all duration-300 text-gray-300 hover:text-gray-200 border border-gray-500/30 shadow-lg transform hover:scale-105">
                    <span className="text-xl">🐙</span>
                    <span className="font-semibold">GitHub</span>
                  </a>
                )}
                {candidate.twitter && (
                  <a href={candidate.twitter} className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-sky-500/30 to-sky-600/30 hover:from-sky-500/50 hover:to-sky-600/50 rounded-xl transition-all duration-300 text-sky-300 hover:text-sky-200 border border-sky-500/30 shadow-lg transform hover:scale-105">
                    <span className="text-xl">🐦</span>
                    <span className="font-semibold">Twitter</span>
                  </a>
                )}
                {candidate.website && (
                  <a href={candidate.website} className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-600/30 to-purple-700/30 hover:from-purple-600/50 hover:to-purple-700/50 rounded-xl transition-all duration-300 text-purple-300 hover:text-purple-200 border border-purple-500/30 shadow-lg transform hover:scale-105">
                    <span className="text-xl">🌐</span>
                    <span className="font-semibold">Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ultra-Modern Right Sidebar */}
        <div className="w-full lg:w-1/3 space-y-8">
          
          {/* Premium Resume Section */}
          <div className="bg-gradient-to-br from-white/15 via-white/10 to-transparent backdrop-blur-2xl p-10 shadow-2xl rounded-3xl border border-white/30 relative overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-all duration-300">
                  <span className="text-2xl">📄</span>
                </div>
                <h4 className="text-3xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">Resume</h4>
              </div>
              
              <div className="border-2 border-dashed border-emerald-400/50 rounded-3xl p-8 text-center bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-md hover:border-emerald-400/80 hover:bg-gradient-to-br hover:from-emerald-500/20 hover:to-teal-500/20 transition-all duration-500">
                <input 
                  type="file" 
                  className="hidden" 
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-125 hover:rotate-12">
                      <span className="text-3xl">📁</span>
                    </div>
                    <p className="text-white font-bold text-lg">Click to upload resume ✨</p>
                    <p className="text-emerald-200">PDF, DOC, DOCX (Max 5MB)</p>
                  </div>
                </label>
              </div>

              {candidate.resume ? (
                <div className="mt-8 p-6 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-2 border-emerald-400/50 rounded-3xl backdrop-blur-md">
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-2xl animate-bounce">✅</span>
                    <div>
                      <p className="text-white font-bold text-lg">Uploaded Resume:</p>
                      <p className="text-emerald-200">{candidate.resume}</p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold">
                      <span className="text-lg">📥</span>
                      <span>Download</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold">
                      <span className="text-lg">🗑️</span>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-8 p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/50 rounded-3xl text-center backdrop-blur-md">
                  <span className="text-3xl animate-pulse">⚠️</span>
                  <p className="text-yellow-200 mt-3 font-semibold">No resume uploaded yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Premium Privacy Policy Section */}
          <div className="bg-gradient-to-br from-white/15 via-white/10 to-transparent backdrop-blur-2xl p-10 shadow-2xl rounded-3xl border border-white/30 relative overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] group">
            <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-2xl group-hover:blur-xl transition-all duration-500"></div>
            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-all duration-300">
                  <span className="text-2xl">🔒</span>
                </div>
                <h4 className="text-3xl font-bold bg-gradient-to-r from-violet-300 to-purple-300 bg-clip-text text-transparent">Privacy Policy</h4>
              </div>
              
              <div className={`p-8 rounded-3xl border-2 backdrop-blur-md transition-all duration-500 ${
                candidate.privacyPolicy === "true" 
                  ? "bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-400/50" 
                  : "bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/50"
              }`}>
                <div className="flex items-center justify-center space-x-4">
                  <span className={`text-4xl ${candidate.privacyPolicy === "true" ? "animate-bounce" : "animate-pulse"}`}>
                    {candidate.privacyPolicy === "true" ? "✅" : "❌"}
                  </span>
                  <div>
                    <p className="text-2xl font-bold text-white mb-2">
                      {candidate.privacyPolicy === "true" ? "Accepted ✨" : "Not Accepted ⚠️"}
                    </p>
                    <p className={`${candidate.privacyPolicy === "true" ? "text-emerald-200" : "text-red-200"} font-medium`}>
                      {candidate.privacyPolicy === "true" 
                        ? "Privacy terms have been accepted" 
                        : "Privacy terms need to be accepted"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Footer */}
      <div className="text-center py-10 px-6 relative z-10">
        <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <span className="text-3xl animate-pulse">🔐</span>
            <p className="text-cyan-200 text-xl font-bold">Your privacy matters to us ✨</p>
          </div>
          <p className="text-gray-300 text-lg">
            You can find the details of your application processing in the{' '}
            <a 
              href="/" 
              className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text hover:from-cyan-300 hover:to-blue-300 underline decoration-2 underline-offset-4 hover:decoration-cyan-300 transition-all duration-300 font-semibold"
            >
              privacy policy 📋
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;



