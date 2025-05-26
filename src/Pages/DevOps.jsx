import React, { useState, useEffect } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { getAuth } from "firebase/auth";
import { db } from '../firebase/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CSS = {
  Transform: {
    toString: () => ''
  }
};

export default function DevOps() {
    const initialProcesses = [
        { id: '1', content: 'Source Code Management', tool: null },
        { id: '2', content: 'Build', tool: null },
        { id: '3', content: 'Test', tool: null },
        { id: '4', content: 'Deploy', tool: null }
    ];
    
    const initialTools = [
        { id: '5', content: 'GitHub' },
        { id: '6', content: 'Jenkins' },
        { id: '7', content: 'JUnit' },
        { id: '8', content: 'Docker' },
        { id: '9', content: 'Amazon ECR' },
        { id: '10', content: 'Kubernetes' }
    ];
    
    const [data, setData] = useState({
        processes: initialProcesses,
        tools: initialTools,
        correctOrder: [
          'Source Code Management - GitHub',
          'Build - Jenkins',
          'Test - JUnit',
          'Deploy - Kubernetes'
        ],
        score: 0,
        time: 0,
        isGameOver: false
    });
    
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    
    useEffect(() => {
        if (!data.isGameOver) {
            const timer = setInterval(() => {
            setData((prev) => ({ ...prev, time: prev.time + 1 }));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [data.isGameOver]);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        setEmail(user.email);
    }, []);
    
    const onDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const draggedTool = data.tools.find((t) => t.id === active.id);
        if (!draggedTool) return;

        let returnedTool = null;

        const updatedProcesses = data.processes.map((p) => {
            if (p.id === over.id) {
            if (p.tool) returnedTool = p.tool;
                return { ...p, tool: draggedTool };
            }
            return p;
        });

        const updatedTools = data.tools.filter((t) => t.id !== draggedTool.id);
        if (returnedTool) updatedTools.push(returnedTool);

        const updatedOrder = updatedProcesses.map(
            (p) => `${p.content} - ${p.tool?.content || ''}`
        );

        const score = calculateScore(updatedOrder);

        setData({
            ...data,
            processes: updatedProcesses,
            tools: updatedTools,
            currentOrder: updatedOrder,
            score,
            isGameOver: score === 100
        });
    };

    const calculateScore = (order) => {
        let score = 0;
        for (let i = 0; i < order.length; i++) {
          if (order[i] === data.correctOrder[i]) score += 25;
        }
        return score;
      };
    
      const submitScore = async () => {
        try {
          await addDoc(collection(db, "devOps"), {
            score: data.score,
            time: data.time,
            email: email,
            createdAt: new Date()
          });

          toast.success('Challenge submitted successfully');

          setTimeout(() => {
            navigate('/PMInstructions');
          }, 1000);
        } catch (error) {
          console.log('Error adding devOps data to the database : ', error.message);
        }
      };
    
    const DraggableTool = ({ tool }) => {
        const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
            id: tool.id,
        });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };

        return (
            <div
                ref={setNodeRef}
                style={style}
                className="sky-tool"
                {...listeners}
                {...attributes}
            >
                <div className="tool-icon">⚙️</div>
                <div className="tool-text">{tool.content}</div>
            </div>
        );
    };

    const DroppableProcess = ({ process }) => {
        const { setNodeRef, isOver } = useDroppable({
            id: process.id,
        });

        return (
            <div
                ref={setNodeRef}
                className={`sky-process ${isOver ? 'process-hover' : ''}`}
            >
              <Toaster position="top-right" />
                <div className="process-header">
                    <div className="process-icon">🏗️</div>
                    <div className="process-title">{process.content}</div>
                </div>
                <div className="process-drop-zone">
                    {process.tool ? (
                    <div className="dropped-tool">
                        <div className="tool-icon">⚙️</div>
                        <div className="tool-text">{process.tool.content}</div>
                    </div>
                    ) : (
                    <div className="drop-placeholder">
                        <div className="placeholder-icon">☁️</div>
                        <span className="placeholder-text">Drop Tool Here</span>
                    </div>
                    )}
                </div>
            </div>
        );
    };

    const resetGame = () => {
        setData({
          ...data,
            processes: initialProcesses,
            tools: initialTools,
            score: 0,
            time: 0,
            isGameOver: false
        });
    };

  return (
    <div className="sky-container">
      <style jsx>{`
        .sky-container {
          height: 100vh;
          background: linear-gradient(180deg, #87CEEB 0%, #E0F6FF 50%, #F0F8FF 100%);
          font-family: 'Arial', sans-serif;
          padding: 20px;
          position: relative;
          overflow-x: hidden;
        }

        .sky-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.8) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.6) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 50%);
          pointer-events: none;
          animation: cloudFloat 20s ease-in-out infinite;
        }

        @keyframes cloudFloat {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(30px); }
        }

        .game-title {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          color: #2C5F7C;
          text-shadow: 2px 2px 4px rgba(255,255,255,0.8);
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .sky-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .instructions-btn {
          background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
          border: none;
          color: white;
          padding: 12px;
          border-radius: 25px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          transform: translateY(0);
        }

        .instructions-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        .sky-timer {
          background: rgba(255,255,255,0.9);
          padding: 12px;
          border-radius: 20px;
          color: #2C5F7C;
          font-weight: bold;
          font-size: 1.1rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border: 2px solid rgba(135,206,235,0.3);
        }

        .game-area {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .processes-section {
          flex: 1;
          background: rgba(255,255,255,0.85);
          border-radius: 20px;
          padding: 1rem;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          border: 2px solid rgba(135,206,235,0.3);
        }

        .tools-section {
          flex: 1;
          background: rgba(255,255,255,0.85);
          border-radius: 20px;
          padding: 1rem;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          border: 2px solid rgba(135,206,235,0.3);
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2C5F7C;
          margin-bottom: 1rem;
          text-align: center;
          text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
        }

        .sky-process {
          background: linear-gradient(135deg, #E3F2FD, #BBDEFB);
          border: 2px solid rgba(33,150,243,0.3);
          border-radius: 15px;
          padding: 1rem;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .sky-process:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .process-hover {
          border-color: #4CAF50 !important;
          background: linear-gradient(135deg, #E8F5E8, #C8E6C9) !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(76,175,80,0.3) !important;
        }

        .process-header {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .process-icon {
          font-size: 1.5rem;
          margin-right: 0.5rem;
        }

        .process-title {
          font-weight: bold;
          color: #1976D2;
        }

        .process-drop-zone {
          min-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px dashed rgba(33,150,243,0.3);
          border-radius: 10px;
          background: rgba(255,255,255,0.5);
        }

        .drop-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #757575;
        }

        .placeholder-icon {
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
        }

        .placeholder-text {
          font-size: 0.9rem;
        }

        .dropped-tool {
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #81C784, #66BB6A);
          color: white;
          padding: 10px 15px;
          border-radius: 20px;
          font-weight: bold;
          box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        }

        .reset-btn {
          background: linear-gradient(135deg, #FF7043, #FF5722);
          border: none;
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .reset-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(255,87,34,0.4);
        }

        .sky-tool {
          background: linear-gradient(135deg, #FFB74D, #FF9800);
          border: none;
          border-radius: 15px;
          padding: 10px;
          margin-bottom: 0.75rem;
          cursor: grab;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          color: white;
          font-weight: bold;
        }

        .sky-tool:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 6px 20px rgba(255,152,0,0.4);
        }

        .sky-tool:active {
          cursor: grabbing;
          transform: rotate(5deg);
        }

        .tool-icon {
          font-size: 1.2rem;
          margin-right: 0.5rem;
        }

        .tool-text {
          font-size: 0.9rem;
        }

        .no-tools {
          text-align: center;
          color: #757575;
          font-style: italic;
          padding: 2rem;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .submit-btn {
          background: linear-gradient(135deg, #66BB6A, #4CAF50);
          border: none;
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(76,175,80,0.4);
        }

        .sky-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: linear-gradient(135deg, #E3F2FD, #BBDEFB);
          border-radius: 20px;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 2px solid rgba(33,150,243,0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1976D2;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #757575;
        }

        .modal-body {
          color: #424242;
          line-height: 1.6;
        }

        .modal-body ul {
          padding-left: 1.5rem;
        }

        .modal-body li {
          margin-bottom: 0.5rem;
        }

        .modal-footer {
          display: flex;
          justify-content: center;
          margin-top: 1.5rem;
        }

        .close-modal-btn {
          background: linear-gradient(135deg, #42A5F5, #2196F3);
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-modal-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(33,150,243,0.4);
        }

        @media (max-width: 768px) {
          .game-area {
            flex-direction: column;
          }
          
          .sky-header {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>

      <h1 className="game-title">☁️ CI/CD Pipeline Sky Quest ☁️</h1>
    
      <div className="sky-header">
        <button 
          className="instructions-btn"
          onClick={() => setShowModal(true)}
        >
          📘 Challenge Instructions
        </button>
        
        <div className="sky-timer">
          ⏱ Challenge Time: {Math.floor(data.time / 60)}:
          {(data.time % 60).toString().padStart(2, '0')}
        </div>
      </div>
    
      <DndContext onDragEnd={onDragEnd}>
        <div className="game-area">
          <div className="processes-section">
            <h2 className="section-title">🏗️ Processes</h2>
            {data.processes.map((process) => (
              <DroppableProcess key={process.id} process={process} />
            ))}
          </div>
          
          <div className="tools-section">
            <h2 className="section-title">⚙️ SE Tools</h2>
            {data.tools.length === 0 ? (
              <div className="no-tools">All tools deployed to the clouds! ☁️</div>
            ) : (
              data.tools.map((tool) => <DraggableTool key={tool.id} tool={tool} />)
            )}
          </div>
        </div>
      </DndContext>
    
      <div className="action-buttons">
        <button className="reset-btn" onClick={resetGame}>🔄 Reset Quest</button>
        <button className="submit-btn" onClick={submitScore}>🚀 Launch & Continue</button>
      </div>
    
      {showModal && (
        <div className="sky-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">DevOps Quest Instructions</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>Welcome to the CI/CD Pipeline Sky Quest!</p>
              <ul>
                <li>☁️ Drag tools from the right panel to the correct devOps processes on the left</li>
                <li>✅ Match each tool with its corresponding process</li>
                <li>🏆 Achieve a perfect score to complete your devOps Challenege</li>
                <li>🚀 Launch your pipeline and soar to the next level!</li>
              </ul>
            </div>
            <div className="modal-footer">
              <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                Ready to Start! ✈️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}