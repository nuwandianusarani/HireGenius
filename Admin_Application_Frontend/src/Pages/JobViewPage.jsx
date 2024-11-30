

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/jobs');
//         setJobs(response.data);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleDelete = async (jobID) => {
//     try {
//       await axios.delete(`http://localhost:5000/jobs/${jobID}`);
//       setJobs(jobs.filter((job) => job.jobID !== jobID));
//     } catch (error) {
//       console.error('Error deleting job:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Job List</h1>
//       <ul>
//         {jobs.map((job) => (
//           <li key={job.jobID} style={{ marginBottom: '20px' }}>
//             <div><strong>Job Title:</strong> {job.jobTitle}</div>
//             <div><strong>Job Location:</strong> {job.jobLocation}</div>
//             <div><strong>Job Type:</strong> {job.jobType}</div>
//             <div><strong>Job Name:</strong> {job.jobName}</div>
//             <div><strong>Job Department:</strong> {job.jobDepartment}</div>
//             <div><strong>Qualifications:</strong> {job.qualifications}</div>
//             <div><strong>Required Skills:</strong> {job.requiredSkills}</div>
//             <div><strong>Experience:</strong> {job.experience}</div>
//             <div><strong>Duties:</strong> {job.duties}</div>
//             <a
//               href={`http://localhost:5000/uploads/${job.file_name}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{ marginLeft: '10px' }}
//             >
//               View PDF
//             </a>
//             <button onClick={() => handleDelete(job.jobID)} style={{ marginLeft: '10px' }}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default JobList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// // Job Update Popup Component
// const JobUpdatePopup = ({ job, onUpdate, onClose }) => {
//   const [formData, setFormData] = useState({
//     jobTitle: job.jobTitle,
//     jobLocation: job.jobLocation,
//     jobType: job.jobType,
//     jobName: job.jobName,
//     jobDepartment: job.jobDepartment,
//     qualifications: job.qualifications,
//     requiredSkills: job.requiredSkills,
//     experience: job.experience,
//     duties: job.duties,
//     file: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     for (const key in formData) {
//       form.append(key, formData[key]);
//     }

//     try {
//       await axios.put(`http://localhost:5000/jobs/${job.jobID}`, form);
//       onUpdate(); // Refresh the job list after update
//       onClose(); // Close the popup
//     } catch (error) {
//       console.error('Error updating job:', error);
//     }
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-content">
//         <h2>Update Job</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="jobTitle"
//             value={formData.jobTitle}
//             onChange={handleChange}
//             placeholder="Job Title"
//           />
//           <input
//             type="text"
//             name="jobLocation"
//             value={formData.jobLocation}
//             onChange={handleChange}
//             placeholder="Job Location"
//           />
//           <input
//             type="text"
//             name="jobType"
//             value={formData.jobType}
//             onChange={handleChange}
//             placeholder="Job Type"
//           />
//           <input
//             type="text"
//             name="jobName"
//             value={formData.jobName}
//             onChange={handleChange}
//             placeholder="Job Name"
//           />
//           <input
//             type="text"
//             name="jobDepartment"
//             value={formData.jobDepartment}
//             onChange={handleChange}
//             placeholder="Job Department"
//           />
//           <textarea
//             name="qualifications"
//             value={formData.qualifications}
//             onChange={handleChange}
//             placeholder="Qualifications"
//           />
//           <textarea
//             name="requiredSkills"
//             value={formData.requiredSkills}
//             onChange={handleChange}
//             placeholder="Required Skills"
//           />
//           <textarea
//             name="experience"
//             value={formData.experience}
//             onChange={handleChange}
//             placeholder="Experience"
//           />
//           <textarea
//             name="duties"
//             value={formData.duties}
//             onChange={handleChange}
//             placeholder="Duties"
//           />
//           <input type="file" name="file" onChange={handleFileChange} />
//           <button type="submit">Update Job</button>
//         </form>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/jobs');
//         setJobs(response.data);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleDelete = async (jobID) => {
//     try {
//       await axios.delete(`http://localhost:5000/jobs/${jobID}`);
//       setJobs(jobs.filter((job) => job.jobID !== jobID));
//     } catch (error) {
//       console.error('Error deleting job:', error);
//     }
//   };

//   const handleUpdate = (job) => {
//     setSelectedJob(job);
//   };

//   const handleClosePopup = () => {
//     setSelectedJob(null);
//   };

//   return (
//     <div>
//       <h1>Job List</h1>
//       <ul>
//         {jobs.map((job) => (
//           <li key={job.jobID} style={{ marginBottom: '20px' }}>
//             <div><strong>Job Title:</strong> {job.jobTitle}</div>
//             <div><strong>Job Location:</strong> {job.jobLocation}</div>
//             <div><strong>Job Type:</strong> {job.jobType}</div>
//             <div><strong>Job Name:</strong> {job.jobName}</div>
//             <div><strong>Job Department:</strong> {job.jobDepartment}</div>
//             <div><strong>Qualifications:</strong> {job.qualifications}</div>
//             <div><strong>Required Skills:</strong> {job.requiredSkills}</div>
//             <div><strong>Experience:</strong> {job.experience}</div>
//             <div><strong>Duties:</strong> {job.duties}</div>
//             <a
//               href={`http://localhost:5000/uploads/${job.file_name}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{ marginLeft: '10px' }}
//             >
//               View PDF
//             </a>
//             <button onClick={() => handleDelete(job.jobID)} style={{ marginLeft: '10px' }}>
//               Delete
//             </button>
//             <button onClick={() => handleUpdate(job)} style={{ marginLeft: '10px' }}>
//               Update
//             </button>
//           </li>
//         ))}
//       </ul>

//       {selectedJob && (
//         <JobUpdatePopup job={selectedJob} onUpdate={() => setJobs([...jobs])} onClose={handleClosePopup} />
//       )}
//     </div>
//   );
// };

// export default JobList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './JobList.css'; // Make sure to import the CSS file

// // Job Update Popup Component
// const JobUpdatePopup = ({ job, onUpdate, onClose }) => {
//   const [formData, setFormData] = useState({
//     jobTitle: job.jobTitle,
//     jobLocation: job.jobLocation,
//     jobType: job.jobType,
//     jobName: job.jobName,
//     jobDepartment: job.jobDepartment,
//     qualifications: job.qualifications,
//     requiredSkills: job.requiredSkills,
//     experience: job.experience,
//     duties: job.duties,
//     file: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     for (const key in formData) {
//       form.append(key, formData[key]);
//     }

//     try {
//       await axios.put(`http://localhost:5000/jobs/${job.jobID}`, form);
//       onUpdate(); // Refresh the job list after update
//       onClose(); // Close the popup
//     } catch (error) {
//       console.error('Error updating job:', error);
//     }
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-content">
//         <h2>Update Job</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="jobTitle"
//             value={formData.jobTitle}
//             onChange={handleChange}
//             placeholder="Job Title"
//           />
//           <input
//             type="text"
//             name="jobLocation"
//             value={formData.jobLocation}
//             onChange={handleChange}
//             placeholder="Job Location"
//           />
//           <input
//             type="text"
//             name="jobType"
//             value={formData.jobType}
//             onChange={handleChange}
//             placeholder="Job Type"
//           />
//           <input
//             type="text"
//             name="jobName"
//             value={formData.jobName}
//             onChange={handleChange}
//             placeholder="Job Name"
//           />
//           <input
//             type="text"
//             name="jobDepartment"
//             value={formData.jobDepartment}
//             onChange={handleChange}
//             placeholder="Job Department"
//           />
//           <textarea
//             name="qualifications"
//             value={formData.qualifications}
//             onChange={handleChange}
//             placeholder="Qualifications"
//           />
//           <textarea
//             name="requiredSkills"
//             value={formData.requiredSkills}
//             onChange={handleChange}
//             placeholder="Required Skills"
//           />
//           <textarea
//             name="experience"
//             value={formData.experience}
//             onChange={handleChange}
//             placeholder="Experience"
//           />
//           <textarea
//             name="duties"
//             value={formData.duties}
//             onChange={handleChange}
//             placeholder="Duties"
//           />
//           <input type="file" name="file" onChange={handleFileChange} />
//           <button type="submit">Update Job</button>
//         </form>
//         <button className="close-btn" onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/jobs');
//         setJobs(response.data);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleDelete = async (jobID) => {
//     try {
//       await axios.delete(`http://localhost:5000/jobs/${jobID}`);
//       setJobs(jobs.filter((job) => job.jobID !== jobID));
//     } catch (error) {
//       console.error('Error deleting job:', error);
//     }
//   };

//   const handleUpdate = (job) => {
//     setSelectedJob(job);
//   };

//   const handleClosePopup = () => {
//     setSelectedJob(null);
//   };

//   return (
//     <div className="job-list-container">
//       <h1>Job List</h1>
//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th>Job ID</th>
//               <th>Job Title</th>
//               <th>Job Location</th>
//               <th>Job Type</th>
//               <th>Job Name</th>
//               <th>Job Department</th>
//               <th>Qualifications</th>
//               <th>Required Skills</th>
//               <th>Experience</th>
//               <th>Duties</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job) => (
//               <tr key={job.jobID}>
//                 <td>{job.jobID}</td>
//                 <td>{job.jobTitle}</td>
//                 <td>{job.jobLocation}</td>
//                 <td>{job.jobType}</td>
//                 <td>{job.jobName}</td>
//                 <td>{job.jobDepartment}</td>
//                 <td>{job.qualifications}</td>
//                 <td>{job.requiredSkills}</td>
//                 <td>{job.experience}</td>
//                 <td>{job.duties}</td>
//                 <td>
//                   <a
//                     href={`http://localhost:5000/uploads/${job.file_name}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     View PDF
//                   </a>
//                   <button className="delete-btn" onClick={() => handleDelete(job.jobID)}>Delete</button>
//                   <button className="update-btn" onClick={() => handleUpdate(job)}>Update</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {selectedJob && (
//         <JobUpdatePopup
//           job={selectedJob}
//           onUpdate={() => setJobs(jobs.map(job => job.jobID === selectedJob.jobID ? selectedJob : job))}
//           onClose={handleClosePopup}
//         />
//       )}
//     </div>
//   );
// };

// export default JobList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './JobList.css'; // Make sure to import the CSS file

// // Job Update Popup Component
// const JobUpdatePopup = ({ job, onUpdate, onClose }) => {
//   const [formData, setFormData] = useState({
//     jobTitle: job.jobTitle,
//     jobLocation: job.jobLocation,
//     jobType: job.jobType,
//     jobName: job.jobName,
//     jobDepartment: job.jobDepartment,
//     qualifications: job.qualifications,
//     requiredSkills: job.requiredSkills,
//     experience: job.experience,
//     duties: job.duties,
//     file: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     for (const key in formData) {
//       form.append(key, formData[key]);
//     }

//     try {
//       await axios.put(`http://localhost:5000/jobs/${job._id}`, form); // Use _id instead of jobID
//       onUpdate(); // Refresh the job list after update
//       onClose(); // Close the popup
//     } catch (error) {
//       console.error('Error updating job:', error);
//     }
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-content">
//         <h2>Update Job</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="jobTitle"
//             value={formData.jobTitle}
//             onChange={handleChange}
//             placeholder="Job Title"
//           />
//           <input
//             type="text"
//             name="jobLocation"
//             value={formData.jobLocation}
//             onChange={handleChange}
//             placeholder="Job Location"
//           />
//           <input
//             type="text"
//             name="jobType"
//             value={formData.jobType}
//             onChange={handleChange}
//             placeholder="Job Type"
//           />
//           <input
//             type="text"
//             name="jobName"
//             value={formData.jobName}
//             onChange={handleChange}
//             placeholder="Job Name"
//           />
//           <input
//             type="text"
//             name="jobDepartment"
//             value={formData.jobDepartment}
//             onChange={handleChange}
//             placeholder="Job Department"
//           />
//           <textarea
//             name="qualifications"
//             value={formData.qualifications}
//             onChange={handleChange}
//             placeholder="Qualifications"
//           />
//           <textarea
//             name="requiredSkills"
//             value={formData.requiredSkills}
//             onChange={handleChange}
//             placeholder="Required Skills"
//           />
//           <textarea
//             name="experience"
//             value={formData.experience}
//             onChange={handleChange}
//             placeholder="Experience"
//           />
//           <textarea
//             name="duties"
//             value={formData.duties}
//             onChange={handleChange}
//             placeholder="Duties"
//           />
//           <input type="file" name="file" onChange={handleFileChange} />
//           <button type="submit">Update Job</button>
//         </form>
//         <button className="close-btn" onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/jobs');
//         setJobs(response.data);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleDelete = async (jobId) => {
//     try {
//       await axios.delete(`http://localhost:5000/jobs/${jobId}`); // Use _id instead of jobID
//       setJobs(jobs.filter((job) => job._id !== jobId)); // Filter by _id
//     } catch (error) {
//       console.error('Error deleting job:', error);
//     }
//   };

//   const handleUpdate = (job) => {
//     setSelectedJob(job);
//   };

//   const handleClosePopup = () => {
//     setSelectedJob(null);
//   };

//   return (
//     <div className="job-list-container">
//       <h1>Job List</h1>
//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th>Job ID</th>
//               <th>Job Title</th>
//               <th>Job Location</th>
//               <th>Job Type</th>
//               <th>Job Name</th>
//               <th>Job Department</th>
//               <th>Qualifications</th>
//               <th>Required Skills</th>
//               <th>Experience</th>
//               <th>Duties</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job) => (
//               <tr key={job._id}> {/* Use _id instead of jobID */}
//                 <td>{job._id}</td> {/* Display _id instead of jobID */}
//                 <td>{job.jobTitle}</td>
//                 <td>{job.jobLocation}</td>
//                 <td>{job.jobType}</td>
//                 <td>{job.jobName}</td>
//                 <td>{job.jobDepartment}</td>
//                 <td>{job.qualifications}</td>
//                 <td>{job.requiredSkills}</td>
//                 <td>{job.experience}</td>
//                 <td>{job.duties}</td>
//                 <td>
//                   <a
//                     href={`http://localhost:5000/uploads/general/${job.file_name}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     View PDF
//                   </a>
//                   <button className="delete-btn" onClick={() => handleDelete(job._id)}> {/* Use _id */}
//                     Delete
//                   </button>
//                   <button className="update-btn" onClick={() => handleUpdate(job)}>
//                     Update
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {selectedJob && (
//         <JobUpdatePopup
//           job={selectedJob}
//           onUpdate={() => setJobs(jobs.map(job => job._id === selectedJob._id ? selectedJob : job))}
//           onClose={handleClosePopup}
//         />
//       )}
//     </div>
//   );
// };

// export default JobList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './JobList.css'; // Make sure to import the CSS file

// // Job Update Popup Component
// const JobUpdatePopup = ({ job, onUpdate, onClose }) => {
//   const [formData, setFormData] = useState({
//     jobTitle: job.jobTitle,
//     jobLocation: job.jobLocation,
//     jobType: job.jobType,
//     jobName: job.jobName,
//     jobDepartment: job.jobDepartment,
//     qualifications: job.qualifications,
//     requiredSkills: job.requiredSkills,
//     experience: job.experience,
//     duties: job.duties,
//     file: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     for (const key in formData) {
//       form.append(key, formData[key]);
//     }

//     try {
//       await axios.put(`http://localhost:5000/jobs/${job._id}`, form); // Use _id instead of jobID
//       onUpdate(); // Refresh the job list after update
//       onClose(); // Close the popup
//     } catch (error) {
//       console.error('Error updating job:', error);
//     }
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup-content">
//         <h2>Update Job</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="jobTitle"
//             value={formData.jobTitle}
//             onChange={handleChange}
//             placeholder="Job Title"
//           />
//           <input
//             type="text"
//             name="jobLocation"
//             value={formData.jobLocation}
//             onChange={handleChange}
//             placeholder="Job Location"
//           />
//           <input
//             type="text"
//             name="jobType"
//             value={formData.jobType}
//             onChange={handleChange}
//             placeholder="Job Type"
//           />
//           <input
//             type="text"
//             name="jobName"
//             value={formData.jobName}
//             onChange={handleChange}
//             placeholder="Job Name"
//           />
//           <input
//             type="text"
//             name="jobDepartment"
//             value={formData.jobDepartment}
//             onChange={handleChange}
//             placeholder="Job Department"
//           />
//           <textarea
//             name="qualifications"
//             value={formData.qualifications}
//             onChange={handleChange}
//             placeholder="Qualifications"
//           />
//           <textarea
//             name="requiredSkills"
//             value={formData.requiredSkills}
//             onChange={handleChange}
//             placeholder="Required Skills"
//           />
//           <textarea
//             name="experience"
//             value={formData.experience}
//             onChange={handleChange}
//             placeholder="Experience"
//           />
//           <textarea
//             name="duties"
//             value={formData.duties}
//             onChange={handleChange}
//             placeholder="Duties"
//           />
//           <input type="file" name="file" onChange={handleFileChange} />
//           <button type="submit">Update Job</button>
//         </form>
//         <button className="close-btn" onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/jobs');
//         setJobs(response.data);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleDelete = async (jobId) => {
//     try {
//       await axios.delete(`http://localhost:5000/jobs/${jobId}`); // Use _id instead of jobID
//       setJobs(jobs.filter((job) => job._id !== jobId)); // Filter by _id
//     } catch (error) {
//       console.error('Error deleting job:', error);
//     }
//   };

//   const handleUpdate = (job) => {
//     setSelectedJob(job);
//   };

//   const handleClosePopup = () => {
//     setSelectedJob(null);
//   };

//   return (
//     <div className="job-list-container">
//       <h1>Job List</h1>
//       <div className="job-list">
//         {jobs.map((job) => (
//           <div key={job._id} className="job-item">
//             <h3>{job.jobTitle}</h3>
//             <p><strong>Location:</strong> {job.jobLocation}</p>
//             <p><strong>Type:</strong> {job.jobType}</p>
//             <p><strong>Name:</strong> {job.jobName}</p>
//             <p><strong>Department:</strong> {job.jobDepartment}</p>
//             <p><strong>Qualifications:</strong> {job.qualifications}</p>
//             <p><strong>Required Skills:</strong> {job.requiredSkills}</p>
//             <p><strong>Experience:</strong> {job.experience}</p>
//             <p><strong>Duties:</strong> {job.duties}</p>
//             <a
//               href={`http://localhost:5000/uploads/general/${job.file_name}`}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               View PDF
//             </a>
//             <button className="delete-btn" onClick={() => handleDelete(job._id)}>Delete</button>
//             <button className="update-btn" onClick={() => handleUpdate(job)}>Update</button>
//           </div>
//         ))}
//       </div>

//       {selectedJob && (
//         <JobUpdatePopup
//           job={selectedJob}
//           onUpdate={() => setJobs(jobs.map(job => job._id === selectedJob._id ? selectedJob : job))}
//           onClose={handleClosePopup}
//         />
//       )}
//     </div>
//   );
// };

// export default JobList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './JobList.css'; // Make sure to import the CSS file

// Job Update Popup Component
const JobUpdatePopup = ({ job, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    jobTitle: job.jobTitle,
    jobLocation: job.jobLocation,
    jobType: job.jobType,
    jobName: job.jobName,
    jobDepartment: job.jobDepartment,
    qualifications: job.qualifications,
    requiredSkills: job.requiredSkills,
    experience: job.experience,
    duties: job.duties,
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      await axios.put(`http://localhost:5000/jobs/${job._id}`, form); // Use _id instead of jobID
      onUpdate(); // Refresh the job list after update
      onClose(); // Close the popup
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Update Job</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Job Title"
          />
          <input
            type="text"
            name="jobLocation"
            value={formData.jobLocation}
            onChange={handleChange}
            placeholder="Job Location"
          />
          <input
            type="text"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            placeholder="Job Type"
          />
          <input
            type="text"
            name="jobName"
            value={formData.jobName}
            onChange={handleChange}
            placeholder="Job Name"
          />
          <input
            type="text"
            name="jobDepartment"
            value={formData.jobDepartment}
            onChange={handleChange}
            placeholder="Job Department"
          />
          <textarea
            name="qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            placeholder="Qualifications"
          />
          <textarea
            name="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleChange}
            placeholder="Required Skills"
          />
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience"
          />
          <textarea
            name="duties"
            value={formData.duties}
            onChange={handleChange}
            placeholder="Duties"
          />
          <input type="file" name="file" onChange={handleFileChange} />
          <button type="submit">Update Job</button>
        </form>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 2;

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

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/jobs/${jobId}`); // Use _id instead of jobID
      setJobs(jobs.filter((job) => job._id !== jobId)); // Filter by _id
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleUpdate = (job) => {
    setSelectedJob(job);
  };

  const handleClosePopup = () => {
    setSelectedJob(null);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="job-list-container">
      <h1>Job List</h1>
      <div className="job-list">
        {currentJobs.map((job) => (
          <div key={job._id} className="job-item">
            <h3>{job.jobTitle}</h3>
            <p><strong>Location:</strong> {job.jobLocation}</p>
            <p><strong>Type:</strong> {job.jobType}</p>
            <p><strong>Name:</strong> {job.jobName}</p>
            <p><strong>Department:</strong> {job.jobDepartment}</p>
            <p><strong>Qualifications:</strong> {job.qualifications}</p>
            <p><strong>Required Skills:</strong> {job.requiredSkills}</p>
            <p><strong>Experience:</strong> {job.experience}</p>
            <p><strong>Duties:</strong> {job.duties}</p>
            <a
              href={`http://localhost:5000/uploads/general/${job.file_name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF
            </a>
            <button className="delete-btn" onClick={() => handleDelete(job._id)}>Delete</button>
            <button className="update-btn" onClick={() => handleUpdate(job)}>Update</button>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      {selectedJob && (
        <JobUpdatePopup
          job={selectedJob}
          onUpdate={() => setJobs(jobs.map(job => job._id === selectedJob._id ? selectedJob : job))}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default JobList;