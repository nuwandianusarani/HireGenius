// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// const JobForm = () => {
//   const navigate = useNavigate();
//   const { jobID } = useParams(); // Get jobID from the URL for editing
//   const [formData, setFormData] = useState({
//     jobID: '',
//     jobTitle: '',
//     jobName: '',
//     jobLocation: '',
//     jobType: 'onsite',
//     jobDepartment: '',
//     qualifications: '',
//     requiredSkills: '',
//     experience: '',
//     duties: '',
//   });

//   const [file, setFile] = useState(null);

//   // Fetch existing job data for editing
//   useEffect(() => {
//     if (jobID) {
//       const fetchJob = async () => {
//         const response = await axios.get(`http://localhost:5000/jobs/${jobID}`);
//         setFormData(response.data);
//       };
//       fetchJob();
//     }
//   }, [jobID]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (jobID) {
//       // Update existing job
//       await axios.put(`http://localhost:5000/jobs/${jobID}`, formData);
//       alert('Job updated successfully!');
//     } else {
//       // Create new job
//       const formDataToSend = new FormData();
//       Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
//       if (file) formDataToSend.append('file', file);

//       await axios.post('http://localhost:5000/jobs', formDataToSend);
//       alert('Job added successfully!');
//     }

//     navigate('/');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="job-form">
//       <input type="text" name="jobID" placeholder="Job ID" value={formData.jobID} onChange={handleChange} required />
//       <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} required />
//       <input type="text" name="jobName" placeholder="Job Name" value={formData.jobName} onChange={handleChange} required />
//       <input type="text" name="jobLocation" placeholder="Job Location" value={formData.jobLocation} onChange={handleChange} required />
//       <select name="jobType" value={formData.jobType} onChange={handleChange}>
//         <option value="onsite">Onsite</option>
//         <option value="remote">Remote</option>
//         <option value="hybrid">Hybrid</option>
//       </select>
//       <input type="text" name="jobDepartment" placeholder="Job Department" value={formData.jobDepartment} onChange={handleChange} />
//       <textarea name="qualifications" placeholder="Qualifications" value={formData.qualifications} onChange={handleChange} />
//       <textarea name="requiredSkills" placeholder="Required Skills" value={formData.requiredSkills} onChange={handleChange} />
//       <textarea name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} />
//       <textarea name="duties" placeholder="Essential Duties" value={formData.duties} onChange={handleChange} />
//       <input type="file" onChange={handleFileChange} />
//       <button type="submit">{jobID ? 'Update Job' : 'Submit'}</button>
//     </form>
//   );
// };

// export default JobForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const JobForm = () => {
  const navigate = useNavigate();
  const { jobID } = useParams();
  const [formData, setFormData] = useState({
    jobID: '',
    jobTitle: '',
    jobName: '',
    jobLocation: '',
    jobType: 'onsite',
    jobDepartment: '',
    qualifications: '',
    requiredSkills: '',
    experience: '',
    duties: '',
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (jobID) {
      const fetchJob = async () => {
        const response = await axios.get(`http://localhost:5000/jobs/${jobID}`);
        setFormData(response.data);
      };
      fetchJob();
    }
  }, [jobID]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (jobID) {
      await axios.put(`http://localhost:5000/jobs/${jobID}`, formData);
      alert('Job updated successfully!');
    } else {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
      if (file) formDataToSend.append('file', file);

      await axios.post('http://localhost:5000/jobs', formDataToSend);
      alert('Job added successfully!');
    }

    navigate('/');
  };

  return (
    <div className="job-form-container">
      <form onSubmit={handleSubmit} className="job-form">
        <h1>{jobID ? 'Edit Job' : 'Create New Job'}</h1>
        <input type="text" name="jobID" placeholder="Job ID" value={formData.jobID} onChange={handleChange} required />
        <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} required />
        <input type="text" name="jobName" placeholder="Job Name" value={formData.jobName} onChange={handleChange} required />
        <input type="text" name="jobLocation" placeholder="Job Location" value={formData.jobLocation} onChange={handleChange} required />
        <select name="jobType" value={formData.jobType} onChange={handleChange}>
          <option value="onsite">Onsite</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <input type="text" name="jobDepartment" placeholder="Job Department" value={formData.jobDepartment} onChange={handleChange} />
        <textarea name="qualifications" placeholder="Qualifications" value={formData.qualifications} onChange={handleChange} />
        <textarea name="requiredSkills" placeholder="Required Skills" value={formData.requiredSkills} onChange={handleChange} />
        <textarea name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} />
        <textarea name="duties" placeholder="Essential Duties" value={formData.duties} onChange={handleChange} />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">{jobID ? 'Update Job' : 'Submit'}</button>
      </form>

      <style jsx>{`
        .job-form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f9f9f9;
          padding: 20px;
        }
        .job-form {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 600px;
        }
        .job-form h1 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        .job-form input,
        .job-form select,
        .job-form textarea,
        .job-form button {
          width: 100%;
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }
        .job-form input:focus,
        .job-form select:focus,
        .job-form textarea:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }
        .job-form textarea {
          resize: vertical;
          min-height: 100px;
        }
        .job-form button {
          background: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s;
        }
        .job-form button:hover {
          background: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default JobForm;
