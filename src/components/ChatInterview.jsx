import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import questions from '../Questions/Questions'; 

function ChatInterview() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [conversation, setConversation] = useState([]);
  const [chatStarted, setChatStarted] = useState(false); 
  const chatBoxRef = useRef(null); 

  const startChat = () => {
    setChatStarted(true);
    setConversation([
      { role: 'system', message: 'Welcome to the HR interview chat! Please answer the following questions one by one.' },
      { role: 'system', message: 'Let\'s start with the first question.' },
      { role: 'system', message: questions[0].question, video: questions[0].video },
    ]);
  };

  // Handle the answer submission
  const handleAnswerSubmit = () => {
    if (userAnswer.trim() === '') return; 

    const currentQuestion = questions[currentQuestionIndex];

    setConversation(prev => [
      ...prev,
      { role: 'user', message: userAnswer }
    ]);

    const savedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
    const existingAnswerIndex = savedAnswers.findIndex(answer => answer.Qid === currentQuestion.Qid);

    if (existingAnswerIndex !== -1) {
      // Update existing answer
      savedAnswers[existingAnswerIndex].answer = userAnswer;
    } else {
      // Add new answer
      savedAnswers.push({
        Qid: currentQuestion.Qid,
        category: currentQuestion.category,
        answer: userAnswer
      });
    }

    localStorage.setItem('userAnswers', JSON.stringify(savedAnswers));

    // Move to the next question
    setUserAnswer('');
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  // Update the conversation with the next question
  useEffect(() => {
    if (currentQuestionIndex > 0 && currentQuestionIndex < questions.length) {
      setConversation(prev => [
        ...prev,
        { role: 'system', message: questions[currentQuestionIndex].question, video: questions[currentQuestionIndex].video }
      ]);
    } else if (currentQuestionIndex === questions.length) {
      //redirect to results
      setConversation(prev => [
        ...prev,
        { role: 'system', message: 'Thank you for completing the interview!' }
      ]);
        window.location.href = '/results';
    }
  }, [currentQuestionIndex]);

  // Scroll to the bottom of the chat box 
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [conversation]);

  // Handle input change
  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  // Handle "Enter" key press 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleAnswerSubmit(); 
    }
  };

  return (
    <div className="container-fluid h-100 d-flex flex-column p-4 bg-dark text-white">

        <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#ffffff",
          textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        HireFlow
      </div>

      {/* Modal */}
      {!chatStarted && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-dark">Interview Instructions</h5>
              </div>
              <div className="modal-body text-dark">
                <p>Welcome to the interview! Here's how it works:</p>
                <ul>
                  <li>Questions will be displayed one at a time.</li>
                  <li>Answer each question thoughtfully in the text box provided.</li>
                  <li>Some questions may include a video for context. Watch it carefully.</li>
                  <li>Click "Submit Answer" or press "Enter" to proceed to the next question.</li>
                </ul>
                <p>Click "Start Interview" when you're ready.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={startChat}
                >
                  Start Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {chatStarted && (
        <>
          <div
            className="chat-box mb-3 flex-grow-1 overflow-auto p-2"
            style={{ maxHeight: '80vh' }}
            ref={chatBoxRef} 
          >
            {conversation.map((msg, index) => (
              <div key={index} className={`message mb-2 d-flex flex-column ${msg.role === 'user' ? 'align-items-end' : ''}`}>
                {/* System message bubble */}
                {msg.role === 'system' && (
                  <>
                    <div className="p-3 mb-1 rounded-3 bg-success text-white d-inline-block" style={{ maxWidth: '60%',  }}>
                      <p className="m-0">{msg.message}</p>
                    </div>
                    {msg.video && (
                      <video 
                        key={msg.video}
                        width="320" 
                        height="240" 
                        autoPlay 
                        className="mb-2"
                        disablePictureInPicture
                        controlsList="nodownload noplaybackrate"
                      >
                        <source src={msg.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </>
                )}

                {/* User's message bubble */}
                {msg.role === 'user' && (
                  <div className="p-3 mb-2 rounded-3 bg-light text-dark d-inline-block" style={{ maxWidth: '60%' }}>
                    <p className="m-0">{msg.message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="d-flex align-items-center">

            {currentQuestionIndex < questions.length && (
              <div className="w-100">
                <textarea
                  value={userAnswer}
                  onChange={handleChange}
                  onKeyDown={handleKeyPress}
                  className="form-control mb-2"
                  placeholder="Type your answer here..."
                  rows={3}
                  style={{ resize: 'none' }}
                />
                <button 
                  onClick={handleAnswerSubmit} 
                  disabled={!userAnswer.trim()} 
                  className="btn btn-primary w-100"
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ChatInterview;
