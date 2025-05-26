// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import questionsData from '../assets/json/questions.json';

// function Results() {
//   const [userAnswers, setUserAnswers] = useState([]);
//   const [totalScore, setTotalScore] = useState(0);
//   const [stage3Score, setStage3Score] = useState(0);

//   useEffect(() => {
//     const stage = localStorage.getItem('stage3Score') || 0;
//     setStage3Score(stage);

//     const savedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
//     setUserAnswers(savedAnswers);

//     // Calculate total score
//     let score = 0;
//     savedAnswers.forEach(answer => {
//       const question = questionsData.questions.find(q => q.Qid === answer.Qid);
//       if (question) {
//         const selectedOption = question.options.find(opt => opt.text === answer.answer);
//         if (selectedOption) {
//           score += selectedOption.score;
//         }
//       }
//     });

//     setTotalScore(score);
//   }, []);

//   return (
//     <>
//       {/* Header Section */}
//       <div className="bg-dark text-white p-3 text-center fw-bold fs-3">
//         HireGenius Admin View
//       </div>

//       {/* Score Display */}
//       <div className="container mt-3">
//         <div className="row text-center">
//           <div className="col-md-6 mb-3">
//             <div className="p-3 bg-light rounded shadow">
//               <h4 className="text-dark">Stage 2 Score</h4>
//               <h2 className="text-primary fw-bold">{totalScore}</h2>
//             </div>
//           </div>
//           <div className="col-md-6 mb-3">
//             <div className="p-3 bg-light rounded shadow">
//               <h4 className="text-dark">Stage 3 Score</h4>
//               <h2 className="text-success fw-bold">{stage3Score}</h2>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Answers Overview */}
//       <div className="container mt-4">
//         <h3 className="text-center mb-4 fw-bold text-dark">Interview Answers</h3>
//         <div className="row gy-3">
//           {userAnswers.map((answer, index) => {
//             const question = questionsData.questions.find(q => q.Qid === answer.Qid);
//             if (!question) return null;

//             const selectedOption = question.options.find(opt => opt.text === answer.answer);
//             const isCorrect = selectedOption ? selectedOption.correct : false;

//             return (
//               <div className="col-12" key={index}>
//                 <div className="card border-0 shadow-lg">
//                   <div className="card-header bg-dark text-white d-flex justify-content-between">
//                     <span className="fw-bold">{question.question}</span>
//                     <div>
//                       <span className="badge bg-primary me-2">{answer.category}</span>
//                       <span className={`badge ${isCorrect ? 'bg-success' : 'bg-danger'}`}>
//                         {isCorrect ? 'Correct' : 'Incorrect'}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="card-body">
//                     <p className="mb-2">
//                       <strong>Your Answer:</strong> <span className="text-primary">{answer.answer}</span>
//                     </p>
//                     {selectedOption && (
//                       <p>
//                         <strong>Allocated Score:</strong> <span className="text-success">{selectedOption.score}</span>
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Results;
