import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const PersonBox = ({ person, removeTask, sickLeave }) => {
  const { isOver, setNodeRef } = useDroppable({ id: person.id, disabled: sickLeave });

  return (
    <div
      ref={setNodeRef}
      className="person-box"
      style={{
        borderColor: isOver ? '#00ffaa' : '#555',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '15px',
        minWidth: '220px',
        backgroundColor: '#1e1e1e',
        color: 'white',
        userSelect: 'none',
        position: 'relative',
        opacity: sickLeave ? 0.6 : 1,
      }}
    >
      <h5>
        {person.role} {person.role === 'SE' ? '👨‍💻' : person.role === 'DevOps' ? '⚙️' : person.role === 'QA' ? '🔍' : '📊'}
        {sickLeave && (
          <span
            style={{
              color: '#ff4444',
              marginLeft: '10px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              backgroundColor: '#330000',
              padding: '2px 6px',
              borderRadius: '5px',
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
          >
            Sick Leave
          </span>
        )}
      </h5>
      <div>
        {person.tasks.length === 0 ? (
          <span className="text-muted">Drop task here</span>
        ) : (
          person.tasks.map((task) => (
            <div
              key={task.id}
              style={{
                backgroundColor: '#333',
                padding: '10px 10px 10px 15px',
                margin: '5px 0',
                borderRadius: '5px',
                position: 'relative',
              }}
            >
              <span>{task.label}</span>
              <button
                onClick={() => removeTask(person.id, task.id)}
                title="Remove task"
                disabled={sickLeave}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  background: 'transparent',
                  border: 'none',
                  color: '#ff4d4f',
                  fontSize: '1.1rem',
                  cursor: sickLeave ? 'not-allowed' : 'pointer',
                  padding: '0',
                  lineHeight: 1,
                }}
              >
                ✖
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PersonBox;