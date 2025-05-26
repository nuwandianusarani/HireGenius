import React, { useState, useEffect, useRef } from 'react';
import { DndContext } from '@dnd-kit/core';
import PersonBox from './PersonBox';
import TaskCard from './TaskCard';
import '../assets/css/GameBoard2.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth } from "firebase/auth";
import { db } from '../firebase/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const roles = ['SE', 'DevOps', 'QA', 'BM'];

export const taskRoleMap = {
  "Fix Bug": ["SE", "QA"],
  "Write Test": ["QA", "BM"],
  "Deploy": ["DevOps"],
  "Code Review": ["SE", "DevOps"],
  "Update Docs": ["BM", "QA"],
  "Build Feature": ["SE"],
  "Design UI": ["SE"],
  "Optimize DB": ["DevOps", "SE"],
  "Conduct Meeting": ["BM"],
  "Create Report": ["BM", "QA"],
  "Monitor Logs": ["DevOps"],
  "Plan Sprint": ["BM", "SE"]
};

const generateTasks = () => {
  const labels = Object.keys(taskRoleMap);
  return labels.map((label, i) => ({
    id: `task-${i}`,
    label,
    assignedTo: null,
    expired: false,
  }));
};

const initPeople = () =>
  roles.map((role, index) => ({
    id: `person-${index}`,
    role,
    tasks: []
  }));

const MAX_STRESS = 100;
const STRESS_INCREASE = 15;
const STRESS_DECREASE = 10;

const GameBoard = () => {
  const [tasks, setTasks] = useState(generateTasks());
  const [people, setPeople] = useState(initPeople());
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [stress, setStress] = useState(0);
  const [sickLeavePersonId, setSickLeavePersonId] = useState(null);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const taskTimerRef = useRef(null);
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    setEmail(user.email);
  }, []);

  // Filter unassigned & non-expired tasks
  const availableTasks = tasks.filter(t => t.assignedTo === null && !t.expired);

  // Set current task on belt to earliest available
  useEffect(() => {
    if (availableTasks.length > 0) {
      if (currentTaskId === null || !availableTasks.find(t => t.id === currentTaskId)) {
        setCurrentTaskId(availableTasks[0].id);
      }
    } else {
      setCurrentTaskId(null);
    }
  }, [availableTasks, currentTaskId]);

  // 1 min timer per current task before it expires
  useEffect(() => {
    if (taskTimerRef.current) {
      clearTimeout(taskTimerRef.current);
    }
    if (currentTaskId) {
      taskTimerRef.current = setTimeout(() => {
        setTasks(prev =>
          prev.map(t =>
            t.id === currentTaskId ? { ...t, expired: true } : t
          )
        );
        setCurrentTaskId(null);
      }, 6000);
    }
    return () => clearTimeout(taskTimerRef.current);
  }, [currentTaskId]);

  // Sick leave logic: random person every 30s for 30s
  useEffect(() => {
    const interval = setInterval(() => {
      const candidates = people.map(p => p.id).filter(id => id !== sickLeavePersonId);
      if (candidates.length === 0) return;
      const randId = candidates[Math.floor(Math.random() * candidates.length)];
      setSickLeavePersonId(randId);
      setTimeout(() => setSickLeavePersonId(null), 3000);
    }, 3000);
    return () => clearInterval(interval);
  }, [people, sickLeavePersonId]);

  const currentTask = tasks.find(t => t.id === currentTaskId) || null;

  const onDragEnd = ({ active, over }) => {
    if (!over) return;

    const taskId = active.id;
    const personId = over.id;

    if (!currentTask || taskId !== currentTask.id) return;

    if (personId === sickLeavePersonId) {
      alert('This person is currently on sick leave and cannot be assigned tasks.');
      return;
    }

    const task = tasks.find(t => t.id === taskId);
    if (!task || task.expired) return;

    const fromPersonId = task.assignedTo;

    const newTasks = tasks.map(t =>
      t.id === taskId ? { ...t, assignedTo: personId } : t
    );

    const newPeople = people.map(p => {
      if (p.id === personId) {
        if (!p.tasks.find(t => t.id === taskId)) {
          return { ...p, tasks: [...p.tasks, { ...task, assignedTo: personId }] };
        }
      }
      if (p.id === fromPersonId) {
        return { ...p, tasks: p.tasks.filter(t => t.id !== taskId) };
      }
      return p;
    });

    setTasks(newTasks);
    setPeople(newPeople);
    setCurrentTaskId(null);

    const allowedRoles = taskRoleMap[task.label] || [];
    const assignedPerson = people.find(p => p.id === personId);
    if (allowedRoles.length && assignedPerson && allowedRoles[0] !== assignedPerson.role) {
      setStress(s => Math.min(MAX_STRESS, s + STRESS_INCREASE));
    } else {
      setStress(s => Math.max(0, s - STRESS_DECREASE));
    }
  };

  // Remove task
  const removeTask = (personId, taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newTasks = tasks.map(t =>
      t.id === taskId ? { ...t, assignedTo: null, expired: false } : t
    );

    const newPeople = people.map(p => {
      if (p.id === personId) {
        return { ...p, tasks: p.tasks.filter(t => t.id !== taskId) };
      }
      return p;
    });

    setTasks(newTasks);
    setPeople(newPeople);

    const allowedRoles = taskRoleMap[task.label] || [];
    const assignedPerson = people.find(p => p.id === personId);
    if (allowedRoles.length && assignedPerson && allowedRoles[0] !== assignedPerson.role) {
      setStress(s => Math.max(0, s - STRESS_DECREASE));
    }
  };

  // Calculate score & check game end condition
  useEffect(() => {
    let totalScore = 0;
    tasks.forEach(t => {
      if (t.assignedTo && !t.expired) {
        const person = people.find(p => p.id === t.assignedTo);
        const allowedRoles = taskRoleMap[t.label] || [];
        if (person) {
          if (allowedRoles[0] === person.role) totalScore += 5;
          else if (allowedRoles.includes(person.role)) totalScore += 2.5;
        }
      }
    });
    setScore(totalScore);

    const allAssignedOrExpired = tasks.every(t => t.assignedTo !== null || t.expired);
    const allExpired = tasks.every(t => t.expired);

    if (allAssignedOrExpired || allExpired) {
      setTimeout(() => setShowModal(true), 300);
      // localStorage.setItem('task-game-score', totalScore);
      submitScoreToFirebase(totalScore);
    }
  }, [tasks, people]);

  const submitScoreToFirebase = async (score) => {
    try {
      await addDoc(collection(db, "PM"), {
        score: score,
        time: Date.now(),
        email: email,
        createdAt: new Date()
      });

      toast.success('Score submitted to Firebase');

      window.localStorage.clear();

      setTimeout(() => {
        const redirectUrl = `https://hire-genius-developer-stage.vercel.app/?email=${encodeURIComponent(email)}`;
        window.location.href = redirectUrl;
      }, 1000);
    } catch (error) {
      console.error('Error adding score to Firebase:', error.message);
      toast.error('Failed to submit score');
    }
  };

  return (
    <div
      className="game-board"
      style={{
        height: '100vh',
        minWidth: '100%',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-success">🎯 Assign Tasks to Team</h2>
      </header>

      <div
        className="stress-bar-container mb-3"
        style={{ height: 25, backgroundColor: '#222', borderRadius: 10, overflow: 'hidden' }}
      >
        <div
          className="stress-bar-fill"
          style={{
            width: `${stress}%`,
            height: '100%',
            backgroundColor: stress < 50 ? '#00ffaa' : stress < 80 ? '#ffcc00' : '#ff4444',
            transition: 'width 0.3s ease-in-out',
          }}
        />
      </div>
      <p style={{ color: '#fff', marginBottom: 10 }}>Stress Level: {stress}%</p>

      <DndContext onDragEnd={onDragEnd}>
        <div className="d-flex flex-wrap justify-content-between mb-4" style={{ flexGrow: 1, overflowY: 'auto' }}>
          {people.map(p => (
            <PersonBox
              key={p.id}
              person={p}
              removeTask={removeTask}
              sickLeave={p.id === sickLeavePersonId}
            />
          ))}
        </div>

        <div className="task-pool " >
          <h4 className="text-info">📝 Ongoing Task</h4>
          <div className="d-flex flex-wrap text-white">
            {currentTask ? (
              <TaskCard key={currentTask.id} task={currentTask} />
            ) : (
              <p className="text-muted text-white">No tasks available</p>
            )}
          </div>
        </div>
      </DndContext>

      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">🎉 Game Completed!</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <p>✅ Well done!</p>
                <p>🎯 You've completed all Project Management Tasks.</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={() => alert('Thanks for playing!')}>
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;