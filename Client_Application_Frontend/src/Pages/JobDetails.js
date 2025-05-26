

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import Navbar from '../components/Navbar';

// const JobDetails = () => {
//   const { jobID } = useParams();
//   const navigate = useNavigate();
//   const [job, setJob] = useState(null);

//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/jobs/${jobID}`);
//         setJob(response.data);
//         console.log('Job details:', response.data);
//       } catch (error) {
//         console.error('Error fetching job details:', error);
//       }
//     };
//     fetchJobDetails();
//   }, [jobID]);

//   if (!job) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <motion.div
//           className="text-xl font-bold text-purple-700"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
//         >
//           Loading...
//         </motion.div>
//       </div>
//     );
//   }

//   const handleInterestedClick = () => {
//     navigate(`/form/${job._id}`);
//   };

//   const handleGoBackClick = () => {
//     navigate(-1); // Go back to the previous page
//   };

//   return (
//     <>
//     <Navbar />
    
//     <motion.div
//       className="container mx-auto px-6 py-12 flex flex-col md:flex-row"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1.5 }}
//     >
//       {/* Job Details Section - 4/5 of the container */}
//       <motion.div
//         className="flex-4/5 p-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.5 }}
//       >
//         <motion.h2
//           className="text-4xl font-extrabold text-purple-700 mb-6"
//           initial={{ y: -100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           Job Details
//         </motion.h2>

//         <motion.div
//           className="bg-gradient-to-br from-purple-200/50 via-white/60 to-purple-300/40 backdrop-blur-md border border-gray-200 rounded-lg shadow-xl p-8"
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1, delay: 0.5 }}
//         >
//           <motion.h3
//             className="text-3xl font-bold text-purple-600 mb-4"
//             initial={{ x: -50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             Job Title: {job.jobTitle}
//           </motion.h3>

//           <motion.p
//             className="text-lg text-gray-700 mb-2"
//             initial={{ x: 50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             <strong>Location:</strong> {job.jobLocation}
//           </motion.p>

//           <motion.p
//             className="text-lg text-gray-700 mb-2"
//             initial={{ x: -50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             <strong>Job Type:</strong> {job.jobType}
//           </motion.p>

//           <motion.p
//             className="text-lg text-gray-700 mb-2"
//             initial={{ x: 50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//           >
//             <strong>Department:</strong> {job.jobDepartment}
//           </motion.p>

//           <motion.p
//             className="text-lg text-gray-700 mb-2"
//             initial={{ x: -50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.8 }}
//           >
//             <strong>Qualifications:</strong> {job.qualifications}
//           </motion.p>

//           <motion.p
//             className="text-lg text-gray-700 mb-2"
//             initial={{ x: 50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 1 }}
//           >
//             <strong>Required Skills:</strong> {job.requiredSkills}
//           </motion.p>

//           <motion.p
//             className="text-lg text-gray-700 mb-2"
//             initial={{ x: -50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 1.2 }}
//           >
//             <strong>Experience:</strong> {job.experience}
//           </motion.p>

//           <motion.p
//             className="text-lg text-gray-700 mb-2"
//             initial={{ x: 50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8, delay: 1.4 }}
//           >
//             <strong>Duties:</strong> {job.duties}
//           </motion.p>
//         </motion.div>
//       </motion.div>

//       {/* File Section - 1/5 of the container */}
//       <motion.div
//         className="flex-1/5 p-6 flex flex-col justify-between"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.5 }}
//       >
//         {job.file_name && (
//           <motion.a
//             href={`http://localhost:5000/uploads/general/${job.file_name}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 underline"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1, delay: 1.6 }}
//           >
//             View PDF
//           </motion.a>
//         )}

//         <motion.button
//           onClick={handleInterestedClick}
//           className="mt-3 px-6 py-3 bg-purple-700 text-white font-bold rounded-md hover:bg-purple-600 shadow-lg"
//           whileHover={{ scale: 1.1, backgroundColor: '#6B46C1', color: '#fff' }}
//           whileTap={{ scale: 0.95 }}
//         >
//           I am Interested
//         </motion.button>

//         {/* Go Back Button */}
//         <motion.button
//           onClick={handleGoBackClick}
//           className="mt-4 px-6 py-3 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-400 shadow-lg"
//           whileHover={{ scale: 1.1, backgroundColor: '#4A5568', color: '#fff' }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Go Back
//         </motion.button>
//       </motion.div>
//     </motion.div>
//     </>
//   );
// };

// export default JobDetails;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const JobDetails = () => {
  const { jobID } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/jobs/${jobID}`);
        setJob(response.data);
        console.log("Job details:", response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchJobDetails();
  }, [jobID]);

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="text-xl font-bold text-[#5C5470]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  const handleInterestedClick = () => {
    navigate(`/form/${job._id}`);
  };

  const handleGoBackClick = () => {
    navigate(-1);
  };

  return (
  <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {job.jobTitle}
              </h1>
              <p className="text-lg text-slate-600 mb-4">{job.jobName}</p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  📍 {job.jobLocation}
                </span>
                <span className="flex items-center gap-2">
                  🏢 {job.jobDepartment}
                </span>
                <span className="flex items-center gap-2">
                  💼 {job.jobType}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {job.file_name && (
                <a
                  href={`http://localhost:5000/uploads/general/${job.file_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl border border-slate-200 transition-all duration-200 hover:shadow-md"
                >
                  🗂️ View PDF
                </a>
              )}
              
              <button
                onClick={handleInterestedClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                🚀 I'm Interested
              </button>
              
              <button
                onClick={handleGoBackClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 transition-all duration-200 hover:shadow-md"
              >
                ← Go Back
              </button>
            </div>
          </div>
        </div>

        {/* Job Details Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                📝 Job Description
              </h3>
              <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {job.jobDescription}
              </div>
            </div>

            {/* Duties & Responsibilities */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                📌 Key Responsibilities
              </h3>
              <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {job.duties}
              </div>
            </div>

            {/* Required Skills */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                🛠️ Required Skills
              </h3>
              <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {job.skills}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Info Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                ℹ️ Job Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-slate-500 text-sm font-medium min-w-fit">📍 Location:</span>
                  <span className="text-slate-700 text-sm">{job.jobLocation}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-slate-500 text-sm font-medium min-w-fit">🏢 Department:</span>
                  <span className="text-slate-700 text-sm">{job.jobDepartment}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-slate-500 text-sm font-medium min-w-fit">💼 Type:</span>
                  <span className="text-slate-700 text-sm">{job.jobType}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-slate-500 text-sm font-medium min-w-fit">📅 Posted:</span>
                  <span className="text-slate-700 text-sm">{job.jobPostedDate}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-slate-500 text-sm font-medium min-w-fit">⏰ Deadline:</span>
                  <span className="text-slate-700 text-sm">{job.jobEndsDate}</span>
                </div>
              </div>
            </div>

            {/* Qualifications Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                🎓 Qualifications
              </h3>
              <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                {job.qualifications}
              </div>
            </div>

            {/* Experience Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                🔍 Experience Required
              </h3>
              <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                {job.experience}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-slate-900">Ready to Apply?</h4>
              <p className="text-slate-600 text-sm">Join our team and make an impact</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleGoBackClick}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl border border-slate-200 transition-all duration-200"
              >
                ← Browse More Jobs
              </button>
              <button
                onClick={handleInterestedClick}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                🚀 Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default JobDetails;

