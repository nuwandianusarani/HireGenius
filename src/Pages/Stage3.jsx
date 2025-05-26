import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { db } from '../firebase/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const tasksList = [
  { id: 'task-1', content: 'Fix a critical production bug reported by a customer.' },
  { id: 'task-2', content: 'Complete documentation for a new feature.' },
  { id: 'task-3', content: 'Attend a weekly team meeting.' },
  { id: 'task-4', content: 'Respond to an important email from the CTO.' },
  { id: 'task-5', content: "Review a junior developer's pull request." },
];

const correctOrder = ['task-1', 'task-4', 'task-3', 'task-5', 'task-2'];

export default function Stage3() {
  const [tasks, setTasks] = useState(tasksList);
  const [score, setScore] = useState(0); 
  const [timeLeft, setTimeLeft] = useState(30); 
  const [startTimer, setStartTimer] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [countdown, setCountdown] = useState(3); 
  const [finalScore, setFinalScore] = useState(null); 
  const [userOrder, setUserOrder] = useState([]);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    setEmail(user.email);
  }, []);

  // Countdown before starting the game
  useEffect(() => {
    if (countdown > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else {
      setStartTimer(true);
    }
  }, [countdown]);

  // Timer countdown
  useEffect(() => {
    if (startTimer && timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdown);
            handleSubmit(); 
            setGameOver(true); 
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [startTimer, timeLeft]);

  // TaskItem component
  function TaskItem({ task, isCorrect, slotNumber }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div 
        ref={setNodeRef} 
        style={style} 
        {...attributes} 
        {...listeners}
        className={`task-cloud ${isCorrect ? 'correct-cloud' : ''}`}
      >
        <div className="task-content">
          <span className="task-text">{task.content}</span>
          {slotNumber !== null && (
            <div className="priority-badge">
              {slotNumber + 1}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);

      const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);
      setTasks(reorderedTasks);

      // Update score on each correct drop
      if (reorderedTasks[newIndex].id === correctOrder[newIndex]) {
        setScore(score + 10);
      }
    }
  };

  const handleSubmit = async () => {
    const userOrder = tasks.map((task) => task.id);
    setUserOrder(userOrder);

    // Calculate accuracy score (75% of the total score)
    const correctCount = userOrder.reduce(
      (count, id, idx) => (id === correctOrder[idx] ? count + 1 : count),
      0
    );

    const accuracyScore = (correctCount / correctOrder.length) * 75;
    const timeBonus = Math.min(timeLeft, 25); 
    const totalScore = Math.min(accuracyScore + timeBonus, 100);

    setFinalScore({
      accuracyScore: parseFloat(accuracyScore.toFixed(2)),
      timeBonus: parseFloat(timeBonus.toFixed(2)),
      totalScore: parseFloat(totalScore.toFixed(2)),
    });

    try {
      await addDoc(collection(db, "timeScores"), {
        accuracyScore: accuracyScore,
        timeBonus: timeBonus,
        totalScore: totalScore,
        email: email,
        createdAt: new Date()
      });

      toast.success('You have successfully completed this challenge');

      setTimeout(() => {
        navigate('/SkillsMap');
      }, 1000);
    } catch (error) {
      console.log('Error adding stage 03 marks to the database : ', error.message);
    }

    setGameOver(true); 
  };

  // Restart the game
  const handleRestart = () => {
    setTasks(tasksList);
    setScore(0);
    setTimeLeft(60);
    setStartTimer(false);
    setGameOver(false);
    setCountdown(3); 
    setFinalScore(null); 
    setUserOrder([]);
  };

  return (
    <div style={styles.container}>
      <Toaster position="top-right" />
      {/* Animated clouds background */}
      <div style={styles.cloudsContainer}>
        <div style={{...styles.cloud, ...styles.cloud1}}></div>
        <div style={{...styles.cloud, ...styles.cloud2}}></div>
        <div style={{...styles.cloud, ...styles.cloud3}}></div>
        <div style={{...styles.cloud, ...styles.cloud4}}></div>
      </div>

      <div style={styles.gameContainer}>
        <h2 style={styles.title}>☁️ Sky Office Challenge ☁️</h2>
        <h3 style={styles.subtitle}>Prioritization in the Clouds</h3>

        {countdown > 0 && (
          <div style={styles.countdown}>
            {countdown}
          </div>
        )}

        {startTimer && timeLeft > 0 && (
          <div style={styles.timer}>
            ⏰ Time Remaining: {timeLeft}s
          </div>
        )}

        {/* {gameOver && (
          <div style={styles.gameOver}>
            <h3>🎉 Challenge Complete! 🎉</h3>
          </div>
        )} */}

        <p style={styles.instructions}>
          ✨ Drag and drop the cloud tasks into the correct priority order (1 to 5) ✨
        </p>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
            <div style={styles.tasksContainer}>
              {tasks.map((task, index) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isCorrect={task.id === correctOrder[index]}
                  slotNumber={index} 
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <button
          onClick={handleSubmit}
          style={{
            ...styles.submitButton,
            opacity: (!startTimer || gameOver) ? 0.6 : 1,
            cursor: (!startTimer || gameOver) ? 'not-allowed' : 'pointer'
          }}
          disabled={!startTimer || gameOver} 
        >
          🚀 Submit Priority Order
        </button>
      </div>

      <style jsx>{`
        .task-cloud {
          background: linear-gradient(145deg, #ffffff, #e6f3ff);
          border: 3px solid #87ceeb;
          border-radius: 25px;
          padding: 5px;
          margin: 15px 0;
          cursor: grab;
          transition: all 0.3s ease;
          box-shadow: 
            0 8px 20px rgba(135, 206, 235, 0.3),
            inset 0 2px 4px rgba(255, 255, 255, 0.8);
          position: relative;
          overflow: hidden;
          padding-left: 15px;
        }

        .task-cloud:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 12px 30px rgba(135, 206, 235, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.9);
          border-color: #4fc3f7;
        }

        .task-cloud:active {
          cursor: grabbing;
        }

        .correct-cloud {
          background: linear-gradient(145deg, #e8f5e8, #c8e6c9);
          border-color: #4caf50;
          box-shadow: 
            0 8px 20px rgba(76, 175, 80, 0.3),
            inset 0 2px 4px rgba(255, 255, 255, 0.8);
        }

        .correct-cloud:hover {
          border-color: #388e3c;
          box-shadow: 
            0 12px 30px rgba(76, 175, 80, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.9);
        }

        .task-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 2;
          position: relative;
        }

        .task-text {
          color: #2c5282;
          font-weight: 600;
          font-size: 14px;
          line-height: 1.4;
          flex: 1;
          margin-right: 15px;
        }

        .priority-badge {
          background: linear-gradient(145deg, #4fc3f7, #29b6f6);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
          min-width: 30px;
          text-align: center;
          box-shadow: 0 4px 10px rgba(79, 195, 247, 0.3);
        }

        .task-cloud::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #87ceeb, #4fc3f7, #29b6f6, #87ceeb);
          border-radius: 25px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .task-cloud:hover::before {
          opacity: 0.7;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes drift {
          0% { transform: translateX(0px); }
          50% { transform: translateX(30px); }
          100% { transform: translateX(0px); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    height: '120vh',
    background: 'linear-gradient(135deg, #87ceeb 0%, #98d8e8 25%, #b6e5f0 50%, #d4f1f9 75%, #e1f8fd 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  
  cloudsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 1,
  },

  cloud: {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '50px',
    opacity: 0.6,
  },

  cloud1: {
    width: '100px',
    height: '40px',
    top: '10%',
    left: '10%',
    animation: 'drift 20s infinite ease-in-out',
    boxShadow: 
      '0 0 0 10px rgba(255, 255, 255, 0.6), ' +
      '0 0 0 20px rgba(255, 255, 255, 0.4), ' +
      '0 0 0 30px rgba(255, 255, 255, 0.2)',
  },

  cloud2: {
    width: '80px',
    height: '30px',
    top: '20%',
    right: '15%',
    animation: 'drift 25s infinite ease-in-out reverse',
    boxShadow: 
      '0 0 0 8px rgba(255, 255, 255, 0.6), ' +
      '0 0 0 16px rgba(255, 255, 255, 0.4)',
  },

  cloud3: {
    width: '120px',
    height: '50px',
    top: '60%',
    left: '5%',
    animation: 'drift 30s infinite ease-in-out',
    boxShadow: 
      '0 0 0 12px rgba(255, 255, 255, 0.5), ' +
      '0 0 0 24px rgba(255, 255, 255, 0.3)',
  },

  cloud4: {
    width: '90px',
    height: '35px',
    top: '70%',
    right: '20%',
    animation: 'drift 22s infinite ease-in-out reverse',
    boxShadow: 
      '0 0 0 9px rgba(255, 255, 255, 0.6), ' +
      '0 0 0 18px rgba(255, 255, 255, 0.4)',
  },

  gameContainer: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '30px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
    height: '100%',
  },

  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2c5282',
    textAlign: 'center',
    marginBottom: '10px',
    textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
  },

  subtitle: {
    fontSize: '18px',
    color: '#4a90a4',
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: '500',
  },

  countdown: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#ff6b6b',
    textAlign: 'center',
    marginBottom: '20px',
    textShadow: '3px 3px 6px rgba(255, 255, 255, 0.8)',
    animation: 'float 1s ease-in-out infinite',
  },

  timer: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#2c5282',
    textAlign: 'center',
    marginBottom: '20px',
    padding: '10px',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '25px',
    border: '2px solid #87ceeb',
    boxShadow: '0 8px 20px rgba(135, 206, 235, 0.3)',
  },

  gameOver: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#4caf50',
    textAlign: 'center',
    marginBottom: '20px',
    padding: '10px',
    background: 'rgba(76, 175, 80, 0.1)',
    borderRadius: '25px',
    border: '2px solid #4caf50',
  },

  instructions: {
    fontSize: '16px',
    color: '#2c5282',
    textAlign: 'center',
    marginBottom: '15px',
    fontWeight: '500',
  },

  tasksContainer: {
    marginBottom: '10px',
  },

  submitButton: {
    display: 'block',
    margin: '0 auto',
    padding: '15px 40px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    background: 'linear-gradient(145deg, #4fc3f7, #29b6f6)',
    border: 'none',
    borderRadius: '25px',
    boxShadow: '0 8px 20px rgba(79, 195, 247, 0.4)',
    transition: 'all 0.3s ease',
  },
}