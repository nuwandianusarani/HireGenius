

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const JobDetails = () => {
  const { jobID } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/jobs/${jobID}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJobDetails();
  }, [jobID]);

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="text-xl font-bold text-purple-700"
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
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
    <Navbar />
    
    <motion.div
      className="container mx-auto px-6 py-12 flex flex-col md:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Job Details Section - 4/5 of the container */}
      <motion.div
        className="flex-4/5 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h2
          className="text-4xl font-extrabold text-purple-700 mb-6"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Job Details
        </motion.h2>

        <motion.div
          className="bg-gradient-to-br from-purple-200/50 via-white/60 to-purple-300/40 backdrop-blur-md border border-gray-200 rounded-lg shadow-xl p-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h3
            className="text-3xl font-bold text-purple-600 mb-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Job Title: {job.jobTitle}
          </motion.h3>

          <motion.p
            className="text-lg text-gray-700 mb-2"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <strong>Location:</strong> {job.jobLocation}
          </motion.p>

          <motion.p
            className="text-lg text-gray-700 mb-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <strong>Job Type:</strong> {job.jobType}
          </motion.p>

          <motion.p
            className="text-lg text-gray-700 mb-2"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <strong>Department:</strong> {job.jobDepartment}
          </motion.p>

          <motion.p
            className="text-lg text-gray-700 mb-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <strong>Qualifications:</strong> {job.qualifications}
          </motion.p>

          <motion.p
            className="text-lg text-gray-700 mb-2"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <strong>Required Skills:</strong> {job.requiredSkills}
          </motion.p>

          <motion.p
            className="text-lg text-gray-700 mb-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <strong>Experience:</strong> {job.experience}
          </motion.p>

          <motion.p
            className="text-lg text-gray-700 mb-2"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <strong>Duties:</strong> {job.duties}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* File Section - 1/5 of the container */}
      <motion.div
        className="flex-1/5 p-6 flex flex-col justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {job.file_name && (
          <motion.a
            href={`http://localhost:5000/uploads/general/${job.file_name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
          >
            View PDF
          </motion.a>
        )}

        <motion.button
          onClick={handleInterestedClick}
          className="mt-3 px-6 py-3 bg-purple-700 text-white font-bold rounded-md hover:bg-purple-600 shadow-lg"
          whileHover={{ scale: 1.1, backgroundColor: '#6B46C1', color: '#fff' }}
          whileTap={{ scale: 0.95 }}
        >
          I am Interested
        </motion.button>

        {/* Go Back Button */}
        <motion.button
          onClick={handleGoBackClick}
          className="mt-4 px-6 py-3 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-400 shadow-lg"
          whileHover={{ scale: 1.1, backgroundColor: '#4A5568', color: '#fff' }}
          whileTap={{ scale: 0.95 }}
        >
          Go Back
        </motion.button>
      </motion.div>
    </motion.div>
    </>
  );
};

export default JobDetails;

