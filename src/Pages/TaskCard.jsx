import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const TaskCard = ({ task, timeLeft }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    margin: '10px auto',
    padding: '15px 25px',
    backgroundColor: '#111',
    border: '2px solid #00ffaa',
    borderRadius: '10px',
    cursor: 'grab',
    color: '#fff',
    textAlign: 'center',
    boxShadow: '0 0 12px #00ffaa88',
    width: 'fit-content',
    fontSize: '1.2rem',
    userSelect: 'none'
  };

  const timerStyle = {
    fontSize: '0.8rem',
    color: timeLeft <= 10 ? '#ff4d4d' : '#aaa',
    marginTop: '5px'
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {task.label}
      {typeof timeLeft === 'number' && (
        <div style={timerStyle}>⏳ {timeLeft}s remaining</div>
      )}
    </div>
  );
};

export default TaskCard;
