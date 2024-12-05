import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import questions from '../Questions/Questions'; 

function Results() {
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    // Retrieve user answers from localStorage
    const savedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
    setUserAnswers(savedAnswers);
  }, []);

  return (
    <>
    <div
        style={{
            backgroundColor:"black",
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#ffffff",
        textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
        className='p-2'
    >
        HireFlow
    </div>
    <div className="container mt-2">
      <h3 className="text-center mb-2">Your Interview Answers Overview</h3>
      <div className="row gy-2">
        {userAnswers.map((answer, index) => {
          const question = questions.find(q => q.Qid === answer.Qid);
          return (
            <div
              className="col-12"
              key={index}
              style={{ border: '1px solid #444', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#212529' }}
            >
              <div
                className="p-3 text-white"
                style={{ backgroundColor: '#343a40', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div style={{ fontWeight: 'bold', flex: 1 }}>{question?.question || 'Question not found'}</div>
                <div>
                  <span
                    className="badge bg-primary"
                    style={{ fontSize: '0.9rem', padding: '0.5em 0.8em', whiteSpace: 'nowrap' }}
                  >
                    {answer.category}
                  </span>
                </div>
              </div>
              <div
                className="p-3 text-white"
                style={{ fontSize: '1rem', lineHeight: '1.5', backgroundColor: '#212529' }}
              >
                <strong>Your Answer:</strong> {answer.answer}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}

export default Results;
