import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import questionsData from '../assets/json/questions.json';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Stage-2.css'; 
import { db } from '../firebase/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const NeonPopup = ({ onStart }) => (
  <div className="sky-popup-overlay">
    <div className="sky-popup">
      <div className="cloud-decoration"></div>
      <h2>Ready to Soar?</h2>
      <p>Begin your interview journey through the clouds!</p>
      <button onClick={onStart} className="sky-button primary">
        Start Interview
      </button>
    </div>
  </div>
);

function ChatInterview() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [conversation, setConversation] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const chatBoxRef = useRef(null);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  useEffect(() => {
    const completedStages = JSON.parse(localStorage.getItem("completedStages")) || [];
    if (completedStages.includes("Stage 2")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Fetch user category and filter questions
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    setEmail(user.email);

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

  const handleAnswerSubmit = async () => {
    if (userAnswer.trim() === '') return;

    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(opt => opt.text === userAnswer);
    const optionScore = selectedOption ? selectedOption.score : 0;

    const newScore = score + optionScore;
    setScore(newScore);
    localStorage.setItem('score', newScore);

    setConversation((prev) => [
      ...prev,
      { role: 'user', message: `Selected Answer: ${userAnswer}` },
    ]);

    const savedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || [];
    const existingAnswerIndex = savedAnswers.findIndex(
      (answer) => answer.Qid === currentQuestion.Qid
    );

    const answerData = {
      Qid: currentQuestion.Qid,
      category: currentQuestion.category,
      answer: userAnswer,
      score: optionScore,
    };

    if (existingAnswerIndex !== -1) {
      savedAnswers[existingAnswerIndex] = answerData;
    } else {
      savedAnswers.push(answerData);
    }

    // localStorage.setItem('userAnswers', JSON.stringify(savedAnswers));

    try {
      await addDoc(collection(db, "chats"), {
        result: savedAnswers,
        email: email,
        createdAt: new Date()
      });
    } catch (error) {
      console.log('Error adding scores to the database : ', error.message);
    }

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
    <>
      <style jsx>{`
        .sky-container {
          background: linear-gradient(135deg, #87CEEB 0%, #98D8E8 25%, #B8E6F0 50%, #E0F6FF 75%, #F0F8FF 100%);
          position: relative;
          padding: 2rem;
          font-family: 'Arial', sans-serif;
          height: 120vh;
        }

        .sky-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8) 0%, transparent 50%),
            radial-gradient(circle at 80% 40%, rgba(255,255,255,0.6) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.7) 0%, transparent 50%);
          pointer-events: none;
          animation: cloudDrift 20s ease-in-out infinite;
        }

        @keyframes cloudDrift {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(30px); }
        }

        .sky-header {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .sky-title {
          font-size: 3rem;
          font-weight: bold;
          background: linear-gradient(45deg, #4A90E2, #7BB3F0, #A8D0F0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 8px rgba(74, 144, 226, 0.3);
          margin-bottom: 0.5rem;
          animation: titleFloat 3s ease-in-out infinite;
        }

        @keyframes titleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .sky-subtitle {
          color: #2C5F7F;
          font-size: 1.2rem;
          font-weight: 500;
        }

        .chat-container {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(74, 144, 226, 0.2);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          max-height: 80vh;
        }

        .chat-box {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          background: transparent;
        }

        .chat-box::-webkit-scrollbar {
          width: 8px;
        }

        .chat-box::-webkit-scrollbar-track {
          background: rgba(135, 206, 235, 0.1);
          border-radius: 10px;
        }

        .chat-box::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #87CEEB, #4A90E2);
          border-radius: 10px;
        }

        .message {
          margin-bottom: 1.5rem;
          animation: messageSlideIn 0.5s ease-out;
        }

        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .system-message {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .system-bubble {
          background: linear-gradient(135deg, #4A90E2, #7BB3F0);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 20px 20px 20px 5px;
          max-width: 70%;
          box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
          position: relative;
          margin-bottom: 1rem;
        }

        .system-bubble::before {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 15px;
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid #7BB3F0;
        }

        .user-message {
          display: flex;
          justify-content: flex-end;
        }

        .user-bubble {
          background: linear-gradient(135deg, #98D8E8, #B8E6F0);
          color: #2C5F7F;
          padding: 1rem 1.5rem;
          border-radius: 20px 20px 5px 20px;
          max-width: 70%;
          box-shadow: 0 8px 20px rgba(152, 216, 232, 0.4);
          font-weight: 500;
        }

        .video-container {
          margin-top: 1rem;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(74, 144, 226, 0.2);
        }

        .video-container video {
          width: 100%;
          max-width: 320px;
          height: auto;
          border-radius: 15px;
        }

        .answer-section {
          background: rgba(255, 255, 255, 0.8);
          padding: 2rem;
          border-top: 2px solid rgba(135, 206, 235, 0.3);
        }

        .options-container {
          margin-bottom: 2rem;
        }

        .option-item {
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid rgba(135, 206, 235, 0.3);
          border-radius: 15px;
          padding: 0.5rem;
          margin-bottom: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .option-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(135, 206, 235, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .option-item:hover {
          border-color: #4A90E2;
          box-shadow: 0 8px 20px rgba(74, 144, 226, 0.2);
          transform: translateY(-2px);
        }

        .option-item:hover::before {
          left: 100%;
        }

        .option-item.selected {
          background: linear-gradient(135deg, #E3F2FD, #F0F8FF);
          border-color: #4A90E2;
          box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
        }

        .option-radio {
          appearance: none;
          width: 20px;
          height: 20px;
          border: 2px solid #4A90E2;
          border-radius: 50%;
          margin-right: 1rem;
          position: relative;
          cursor: pointer;
        }

        .option-radio:checked {
          background: #4A90E2;
        }

        .option-radio:checked::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .option-label {
          color: #2C5F7F;
          font-weight: 500;
          cursor: pointer;
          flex: 1;
        }

        .sky-button {
          background: linear-gradient(135deg, #4A90E2, #7BB3F0);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .sky-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .sky-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(74, 144, 226, 0.4);
        }

        .sky-button:hover::before {
          left: 100%;
        }

        .sky-button:disabled {
          background: linear-gradient(135deg, #B0C4DE, #D3D3D3);
          cursor: not-allowed;
          transform: none;
          box-shadow: 0 4px 10px rgba(176, 196, 222, 0.2);
        }

        .sky-button:disabled:hover {
          transform: none;
        }

        .sky-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(135, 206, 235, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .sky-popup {
          background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,248,255,0.95));
          padding: 3rem;
          border-radius: 25px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(74, 144, 226, 0.3);
          backdrop-filter: blur(15px);
          border: 2px solid rgba(255, 255, 255, 0.5);
          position: relative;
          animation: popupSlideIn 0.7s ease-out;
        }

        @keyframes popupSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .cloud-decoration {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 60px;
          height: 40px;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 30%, transparent 70%);
          border-radius: 50px;
          animation: cloudFloat 4s ease-in-out infinite;
        }

        @keyframes cloudFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }

        .sky-popup h2 {
          color: #2C5F7F;
          font-size: 2rem;
          margin-bottom: 1rem;
          font-weight: bold;
        }

        .sky-popup p {
          color: #4A90E2;
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .sky-button.primary {
          width: auto;
          padding: 1rem 3rem;
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .floating-cloud {
          position: absolute;
          width: 100px;
          height: 60px;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 30%, transparent 70%);
          border-radius: 50px;
          animation: floatAcross 15s linear infinite;
        }

        .floating-cloud:nth-child(1) {
          top: 10%;
          animation-duration: 20s;
          animation-delay: 0s;
        }

        .floating-cloud:nth-child(2) {
          top: 30%;
          animation-duration: 25s;
          animation-delay: -5s;
        }

        .floating-cloud:nth-child(3) {
          top: 60%;
          animation-duration: 18s;
          animation-delay: -10s;
        }

        @keyframes floatAcross {
          from {
            left: -120px;
          }
          to {
            left: calc(100% + 20px);
          }
        }
      `}</style>

      <div className="sky-container">
        <div className="floating-elements">
          <div className="floating-cloud"></div>
          <div className="floating-cloud"></div>
          <div className="floating-cloud"></div>
        </div>

        <div className="sky-header">
          <h1 className="sky-title">HireGenius</h1>
          <p className="sky-subtitle">Soar Through Your Interview Journey</p>
        </div>

        {!chatStarted && <NeonPopup onStart={startChat} />}

        {chatStarted && (
          <div className="chat-container">
            <div className="chat-box" ref={chatBoxRef}>
              {conversation.map((msg, index) => (
                <div key={index} className="message">
                  {msg.role === 'system' && (
                    <div className="system-message">
                      <div className="system-bubble">
                        <p style={{ margin: 0 }}>{msg.message}</p>
                      </div>
                      {msg.video && (
                        <div className="video-container">
                          <video
                            key={msg.video}
                            width="320"
                            height="240"
                            autoPlay
                            disablePictureInPicture
                            controlsList="nodownload noplaybackrate"
                          >
                            <source src={msg.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                    </div>
                  )}

                  {msg.role === 'user' && (
                    <div className="user-message">
                      <div className="user-bubble">
                        <p style={{ margin: 0 }}>{msg.message}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {currentQuestionIndex < filteredQuestions.length && (
              <div className="answer-section">
                <div className="options-container">
                  {filteredQuestions[currentQuestionIndex]?.options.map((option, idx) => (
                    <div 
                      key={idx} 
                      className={`option-item ${userAnswer === option.text ? 'selected' : ''}`}
                      onClick={() => setUserAnswer(option.text)}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <input
                        type="radio"
                        name="answer"
                        value={option.text}
                        checked={userAnswer === option.text}
                        onChange={handleAnswerChange}
                        className="option-radio"
                      />
                      <label className="option-label">{option.text}</label>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAnswerSubmit}
                  disabled={!userAnswer.trim()}
                  className="sky-button"
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ChatInterview;