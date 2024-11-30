import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';

const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const handleRowClick = (jobId) => {
    navigate(`/job-details/${jobId}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-3xl font-bold text-purple-700 mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Search all jobs
        </motion.h2>
        <div className="overflow-x-auto">
          <motion.table
            className="min-w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="text-left px-4 py-2 border-b"><FaBriefcase className="inline-block mr-2" />Job Title</th>
                <th className="text-left px-4 py-2 border-b"><FaUserTie className="inline-block mr-2" />Type of Employment</th>
                <th className="text-left px-4 py-2 border-b"><FaBuilding className="inline-block mr-2" />Department</th>
                <th className="text-left px-4 py-2 border-b"><FaMapMarkerAlt className="inline-block mr-2" />Location</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <motion.tr
                  key={job._id} // Use _id instead of jobID
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(job._id)} // Use _id instead of jobID
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <td className="px-4 py-2 border-b">{job.jobTitle}</td>
                  <td className="px-4 py-2 border-b">{job.jobType}</td>
                  <td className="px-4 py-2 border-b">{job.jobDepartment}</td>
                  <td className="px-4 py-2 border-b">{job.jobLocation}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>
    </section>
  );
};

export default JobTable;
