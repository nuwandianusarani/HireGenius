import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Stage-3.css'; 

const tasksList = [
  { id: 'task-1', content: 'Fix a critical production bug reported by a customer.' },
  { id: 'task-2', content: 'Complete documentation for a new feature.' },
  { id: 'task-3', content: 'Attend a weekly team meeting.' },
  { id: 'task-4', content: 'Respond to an important email from the CTO.' },
  { id: 'task-5', content: 'Review a junior developer’s pull request.' },
];

const correctOrder = ['task-1', 'task-4', 'task-3', 'task-5', 'task-2'];

export default function Stage3() {
  const [tasks, setTasks] = useState(tasksList);
  const [score, setScore] = useState(0); 
  const [timeLeft, setTimeLeft] = useState(60); 
  const [startTimer, setStartTimer] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [countdown, setCountdown] = useState(3); 
  const [finalScore, setFinalScore] = useState(null); 
  const [userOrder, setUserOrder] = useState([]); 

  const navigate = useNavigate(); 

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
      padding: '15px 20px',
      marginBottom: '15px',
      background: isCorrect ? 'rgba(0, 255, 204, 0.1)' : 'rgba(0, 0, 0, 0.7)',
      color: '#00ffcc',
      borderRadius: '10px',
      border: `2px solid #00ffcc`,
      cursor: 'grab',
      boxShadow:'0 0 15px rgba(0, 255, 204, 0.6), 0 0 30px rgba(0, 255, 204, 0.4)',
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{task.content}</span>
          {slotNumber !== null && (
            <div
              className="slot-number"
              style={{
                padding: '5px 10px',
                border: '2px dotted #00ffcc',
                borderRadius: '5px',
                color: '#00ffcc',
                fontSize: '14px',
                fontWeight: 'bold',
                minWidth: '50px',
                textAlign: 'center',
              }}
            >
              Slot {slotNumber + 1}
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


  const handleSubmit = () => {
    const userOrder = tasks.map((task) => task.id);
    setUserOrder(userOrder);

    // Calculate accuracy score (75% of the total score)
    const correctCount = userOrder.reduce(
      (count, id, idx) => (id === correctOrder[idx] ? count + 1 : count),
      0
    );
    const accuracyScore = (correctCount / correctOrder.length) * 75;

    // Calculate time bonus (25% of the total score, but capped)
    const timeBonus = Math.min(timeLeft, 25); 

    // Calculate the final score, but it cannot exceed 100%
    const totalScore = Math.min(accuracyScore + timeBonus, 100);

    
    setFinalScore({
      accuracyScore: parseFloat(accuracyScore.toFixed(2)),
      timeBonus: parseFloat(timeBonus.toFixed(2)),
      totalScore: parseFloat(totalScore.toFixed(2)),
    });

    // Store the score in localStorage as 'stage3Score'
    localStorage.setItem('stage3Score', totalScore);

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

  // Redirect to the result page after showing the score
  useEffect(() => {
    if (gameOver && finalScore) {
      setTimeout(() => {
        navigate('/thankyou'); 
      }, 3000); 
    }
  }, [gameOver, finalScore, navigate]);

  return (
    <div className="neon-bg">
      <div className="floating-chain-game">
        <h2 className="neon-text">Office Puzzle: Prioritization Challenge</h2>

        {countdown > 0 && (
          <div className="countdown" style={{ fontSize: '48px', marginBottom: '20px', color: '#00ffcc' }}>
            {countdown}
          </div>
        )}

        {startTimer && timeLeft > 0 && (
          <div className="timer" style={{ fontSize: '24px', marginBottom: '20px', color: '#00ffcc' }}>
            Time Remaining: {timeLeft}s
          </div>
        )}

        {gameOver && (
          <div className="game-over" style={{ fontSize: '24px', marginBottom: '20px', color: '#00ffcc' }}>
            <h3>Game Over!</h3>
          </div>
        )}

        <p className="neon-text">Drag and drop the tasks into the correct priority order (1 to 5).</p>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
            <div className="chain">
              {tasks.map((task, index) => (
                <div key={task.id} className="chain-link">
                  <TaskItem
                    task={task}
                    isCorrect={task.id === correctOrder[index]}
                    slotNumber={index} 
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <button
          onClick={handleSubmit}
          className="submit-button neon-button"
          style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
          disabled={!startTimer || gameOver} 
        >
          Submit
        </button>

        {/* <div style={{ marginTop: '20px', fontSize: '20px' }}>
          <strong className="neon-text">Your Score: {score}</strong>
        </div> */}
      </div>
    </div>
  );
}
