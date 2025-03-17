import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await axios.get('http://localhost:5000/jobs');
      setJobs(response.data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="job-list-container">
      <h1>Job Listings</h1>
      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Job Title</th>
            <th>Job Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job.jobID}</td>
              <td>{job.jobTitle}</td>
              <td>{job.jobName}</td>
              <td>
                <button onClick={() => navigate(`/candidates/${job._id}`)}>
                  View All Candidates
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
