import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import questionsData from '../assets/json/questions.json';
import { useNavigate } from 'react-router-dom';
import NeonPopup from './model/NeonPopup'; 
import '../assets/css/Stage-2.css'; 

function ChatInterview() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [conversation, setConversation] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const chatBoxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const completedStages = JSON.parse(localStorage.getItem("completedStages")) || [];
    if (completedStages.includes("Stage 2")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Fetch user category and filter questions
  useEffect(() => {
    const categoryResult = JSON.parse(localStorage.getItem('categoryResult'));
    if (!categoryResult || !categoryResult.category) {
      alert('Category not found. Redirecting to Stage 1.');
      navigate('/stage-1');
      return;
    }

    const category = categoryResult.category.toLowerCase();
    const categoryQuestions = questionsData.questions.filter(
      (q) => q.difficulty.toLowerCase() === category
    );

    if (categoryQuestions.length === 0) {
      alert('No questions found for your category. Redirecting to Stage 1.');
      navigate('/stage-1');
      return;
    }

    const randomizedQuestions = categoryQuestions.sort(() => Math.random() - 0.5);
    setFilteredQuestions(randomizedQuestions);
  }, [navigate]);

  // Reset userAnswer when moving to the next question
  useEffect(() => {
    if (currentQuestionIndex < filteredQuestions.length) {
      setUserAnswer('');
    }
  }, [currentQuestionIndex, filteredQuestions]);

  const startChat = () => {
    setChatStarted(true);
  };

  const handleAnswerSubmit = () => {
    if (userAnswer.trim() === '') return;

    const currentQuestion = filteredQuestions[currentQuestionIndex];

    setConversation((prev) => [
      ...prev,
      { role: 'user', message: `Selected Answer: ${userAnswer}` },
    ]);

    const savedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
    const existingAnswerIndex = savedAnswers.findIndex(
      (answer) => answer.Qid === currentQuestion.Qid
    );

    if (existingAnswerIndex !== -1) {
      savedAnswers[existingAnswerIndex].answer = userAnswer;
    } else {
      savedAnswers.push({
        Qid: currentQuestion.Qid,
        category: currentQuestion.category,
        answer: userAnswer,
      });
    }

    localStorage.setItem('userAnswers', JSON.stringify(savedAnswers));
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    if (filteredQuestions.length === 0) return;

    if (currentQuestionIndex === 0) {
      setConversation([
        { role: 'system', message: 'Welcome to the HR interview chat! Please answer the following questions one by one.' },
        { role: 'system', message: 'Let\'s start with the first question.' },
        { role: 'system', message: filteredQuestions[0].question, video: filteredQuestions[0].video },
      ]);
      return;
    }

    if (currentQuestionIndex > 0 && currentQuestionIndex < filteredQuestions.length) {
      setConversation((prev) => [
        ...prev,
        {
          role: 'system',
          message: filteredQuestions[currentQuestionIndex].question,
          video: filteredQuestions[currentQuestionIndex].video,
        },
      ]);
      return;
    }

    if (currentQuestionIndex === filteredQuestions.length) {
      setConversation((prev) => [
        ...prev,
        { role: 'system', message: 'Thank you for completing the interview!' },
        { role: 'system', message: 'We will redirect you to Stage 3 shortly.' },
      ]);

      let completedStages = JSON.parse(localStorage.getItem("completedStages")) || [];
      completedStages.push("Stage 2");
      localStorage.setItem("completedStages", JSON.stringify(completedStages));

      setTimeout(() => {
        navigate('/stage-3');
      }, 3000);
    }
  }, [currentQuestionIndex, filteredQuestions, navigate]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  return (
    <div className="container-fluid h-100 d-flex flex-column p-4 bg-dark text-white">
      <div className="neon-text" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        HireGenius
      </div>

      {!chatStarted && <NeonPopup onStart={startChat} />}

      {chatStarted && (
        <>
          <div
            className="chat-box mb-3 flex-grow-1 overflow-auto p-2"
            style={{ maxHeight: '80vh' }}
            ref={chatBoxRef}
          >
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`message mb-2 d-flex flex-column ${
                  msg.role === 'user' ? 'align-items-end' : ''
                }`}
              >
                {msg.role === 'system' && (
                  <>
                    <div className="p-3 mb-1 rounded-3 text-white d-inline-block neon-text neon-green-border" style={{ maxWidth: '60%' }}>
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

                {msg.role === 'user' && (
                  <div className="p-3 mb-2 rounded-3 bg-light text-dark d-inline-block neon-text" style={{ maxWidth: '60%' }}>
                    <p className="m-0">{msg.message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <hr />

          <div className="d-flex align-items-center">
            {currentQuestionIndex < filteredQuestions.length && (
              <div className="w-100">
                <div className="mb-3">
                  {filteredQuestions[currentQuestionIndex].options.map((option, idx) => (
                    <div key={idx} className="form-check">
                      <input
                        type="radio"
                        name="answer"
                        value={option.text}
                        checked={userAnswer === option.text}
                        onChange={handleAnswerChange}
                        className="form-check-input"
                      />
                      <label className="form-check-label neon-text">{option.text}</label>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAnswerSubmit}
                  disabled={!userAnswer.trim()}
                  className="btn neon-button w-100"
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