// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const CandidatesList = () => {
//   const { jobId } = useParams();
//   const [candidates, setCandidates] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/candidates/job/${jobId}`);
//         setCandidates(response.data);
//       } catch (error) {
//         setError("No candidates found for this job.");
//         console.error("Error fetching candidates:", error);
//       }
//     };
//     fetchCandidates();
//   }, [jobId]);

//   return (
//     <div className="candidates-list-container">
//       <h1>Applied Candidates</h1>
//       {error ? (
//         <p className="error-message">{error}</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Projects %</th>
//               <th>Experience %</th>
//               <th>Courses %</th>
//               <th>Achievement %</th>
//               <th>Technologies</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {candidates.map((candidate) => (
//               <tr key={candidate._id}>
//                 <td>{candidate.firstName}</td>
//                 <td>{candidate.lastName}</td>
//                 <td>{candidate.confirmEmail}</td>
//                 <td>{candidate.projectsMatchingSimilarity} </td>
//                 <td>{candidate.workExperienceMatchingSimilarity} </td>
//                 <td>{candidate.coursesAndCertificationMatchingSimilarity} </td>
//                 <td>{candidate.achievements_similarity} </td>
//                 <td>{candidate.num_of_tools_technologies} </td>
//                 <td>
//                   <button onClick={() => console.log("Predict", candidate._id)}>Predict</button>
//                   <button onClick={() => console.log("View More", candidate._id)}>View More</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CandidatesList;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const CandidatesList = () => {
//   const { jobId } = useParams();
//   const [candidates, setCandidates] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCandidates = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/candidates/job/${jobId}`);
//         const sortedCandidates = response.data.sort((a, b) => {
//           return (
//             b.projectsMatchingSimilarity - a.projectsMatchingSimilarity ||
//             b.workExperienceMatchingSimilarity - a.workExperienceMatchingSimilarity ||
//             b.coursesAndCertificationMatchingSimilarity - a.coursesAndCertificationMatchingSimilarity ||
//             b.achievements_similarity - a.achievements_similarity ||
//             b.num_of_tools_technologies - a.num_of_tools_technologies
//           );
//         });
//         setCandidates(sortedCandidates);
//       } catch (error) {
//         setError("No candidates found for this job.");
//         console.error("Error fetching candidates:", error);
//       }
//     };
//     fetchCandidates();
//   }, [jobId]);

//   return (
//     <div className="candidates-list-container">
//       <h1>Applied Candidates</h1>
//       {error ? (
//         <p className="error-message">{error}</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Projects %</th>
//               <th>Experience %</th>
//               <th>Courses %</th>
//               <th>Achievement %</th>
//               <th>Technologies</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {candidates.map((candidate) => (
//               <tr key={candidate._id}>
//                 <td>{candidate.firstName}</td>
//                 <td>{candidate.lastName}</td>
//                 <td>{candidate.confirmEmail}</td>
//                 <td>{candidate.projectsMatchingSimilarity} </td>
//                 <td>{candidate.workExperienceMatchingSimilarity} </td>
//                 <td>{candidate.coursesAndCertificationMatchingSimilarity} </td>
//                 <td>{candidate.achievements_similarity} </td>
//                 <td>{candidate.num_of_tools_technologies} </td>
//                 <td>
//                   <button onClick={() => console.log("Predict", candidate._id)}>Predict</button>
//                   <button onClick={() => console.log("View More", candidate._id)}>View More</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CandidatesList;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CandidatesList = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/candidates/job/${jobId}`);
        const sortedCandidates = response.data.sort((a, b) => {
          return (
            b.projectsMatchingSimilarity - a.projectsMatchingSimilarity ||
            b.workExperienceMatchingSimilarity - a.workExperienceMatchingSimilarity ||
            b.coursesAndCertificationMatchingSimilarity - a.coursesAndCertificationMatchingSimilarity ||
            b.achievements_similarity - a.achievements_similarity ||
            b.num_of_tools_technologies - a.num_of_tools_technologies
          );
        });
        setCandidates(sortedCandidates);
      } catch (error) {
        setError("No candidates found for this job.");
        console.error("Error fetching candidates:", error);
      }
    };
    fetchCandidates();
  }, [jobId]);

  // Function to generate charts and navigate to CandidateCharts page
  const handleViewMore = async (candidateID) => {
    try {
      await axios.post(`http://localhost:5000/candidates/generate_charts/${candidateID}`);
      navigate(`/candidate-charts/${candidateID}`);
    } catch (error) {
      console.error("Error generating charts:", error);
      alert("Failed to generate charts.");
    }
  };

  return (
    <div className="candidates-list-container">
      <h1>Applied Candidates</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Projects %</th>
              <th>Experience %</th>
              <th>Courses %</th>
              <th>Achievement %</th>
              <th>Technologies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id}>
                <td>{candidate.firstName}</td>
                <td>{candidate.lastName}</td>
                <td>{candidate.confirmEmail}</td>
                <td>{candidate.projectsMatchingSimilarity} </td>
                <td>{candidate.workExperienceMatchingSimilarity} </td>
                <td>{candidate.coursesAndCertificationMatchingSimilarity} </td>
                <td>{candidate.achievements_similarity} </td>
                <td>{candidate.num_of_tools_technologies} </td>
                <td>
                  <button onClick={() => handleViewMore(candidate._id)}>View More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CandidatesList;
