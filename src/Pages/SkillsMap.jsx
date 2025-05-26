import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SkillsMap() {
    const [selectedPath, setSelectedPath] = useState(null);
    const [animationPhase, setAnimationPhase] = useState(0);

    const navigate = useNavigate();

    const devOpsCount = 5;
    const pmCount = 5;

    const pathCounts = {
        devops: devOpsCount,
        pm: pmCount,
        webdev: 5
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationPhase(prev => (prev + 1) % 4);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const skillPaths = [
        {
            id: 'devops',
            title: 'DevOps Engineer',
            icon: '⚙️',
            description: 'CI/CD, Cloud & Automation Knowledge',
            color: '#FF6B6B',
            position: { top: '25%', left: '15%' },
            skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Terraform'],
            level: 'Advanced',
            duration: '12 weeks'
        },
        {
            id: 'webdev',
            title: 'Web Developer',
            icon: '💻',
            description: 'Web Applications Knowledge',
            color: '#45B7D1',
            position: { bottom: '20%', left: '50%', transform: 'translateX(-50%)' },
            skills: ['React', 'Node.js', 'MongoDB', 'CSS', 'JavaScript'],
            level: 'Beginner',
            duration: '16 weeks'
        },
        {
            id: 'pm',
            title: 'Project Manager',
            icon: '📊',
            description: 'Project Management Knowledge',
            color: '#4ECDC4',
            position: { top: '25%', right: '15%' },
            skills: ['Agile', 'Scrum', 'Leadership', 'Planning', 'Analytics'],
            level: 'Intermediate',
            duration: '8 weeks'
        },
    ];

    const handlePathSelect = (pathId) => {
        setSelectedPath(pathId);
        console.log(`Navigating to ${pathId} section`);
        navigate('/DevOps');
    };

    const renderPath = (start, end, className = '') => {
        return (
            <svg className={`skill-path ${className}`} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1
            }}>
                <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.8"/>
                        <stop offset="50%" stopColor="#4CAF50" stopOpacity="0.9"/>
                        <stop offset="100%" stopColor="#2196F3" stopOpacity="0.8"/>
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <path
                d={`M ${start.x} ${start.y} Q ${(start.x + end.x) / 2} ${Math.min(start.y, end.y) - 50} ${end.x} ${end.y}`}
                stroke="url(#pathGradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,5"
                filter="url(#glow)"
                className="animated-path"
                />
            </svg>
        );
    };

  return (
    <div className="skills-map-container">
      <style jsx>{`
        .skills-map-container {
          min-height: 100vh;
          background: linear-gradient(180deg, #87CEEB 0%, #E0F6FF 30%, #F0F8FF 70%, #E6F3FF 100%);
          position: relative;
          overflow: hidden;
          font-family: 'Arial', sans-serif;
        }

        .skills-map-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 40%),
            radial-gradient(circle at 80% 30%, rgba(255,255,255,0.3) 0%, transparent 40%),
            radial-gradient(circle at 40% 70%, rgba(255,255,255,0.5) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 40%);
          animation: cloudDrift 25s ease-in-out infinite;
        }

        @keyframes cloudDrift {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          25% { transform: translateX(15px) translateY(-10px); }
          50% { transform: translateX(-10px) translateY(15px); }
          75% { transform: translateX(20px) translateY(-5px); }
        }

        .map-header {
          text-align: center;
          padding: 2rem 1rem;
          position: relative;
          z-index: 10;
        }

        .map-title {
          font-size: 3rem;
          font-weight: bold;
          color: #2C5F7C;
          text-shadow: 2px 2px 4px rgba(255,255,255,0.8);
          margin-bottom: 0.5rem;
          animation: titleFloat 3s ease-in-out infinite;
        }

        @keyframes titleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .map-subtitle {
          font-size: 1.2rem;
          color: #546E7A;
          font-weight: 500;
          text-shadow: 1px 1px 2px rgba(255,255,255,0.6);
        }

        .skills-map {
          position: relative;
          height: 70vh;
          margin: 2rem;
          background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%);
          border-radius: 20px;
        }

        .central-hub {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #FFD700, #FFA000);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          box-shadow: 0 10px 30px rgba(255, 193, 7, 0.4);
          z-index: 5;
          animation: hubPulse 2s ease-in-out infinite;
          border: 4px solid rgba(255,255,255,0.8);
        }

        @keyframes hubPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.05); }
        }

        .skill-node {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s ease;
          z-index: 5;
          border: 3px solid rgba(255,255,255,0.6);
          backdrop-filter: blur(10px);
          text-align: center;
          padding: 1rem;
        }

        .skill-node:hover {
          transform: translateY(-15px) scale(1.05);
          box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        }

        .skill-node.selected {
          transform: translateY(-20px) scale(1.1);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
          border-color: #FFD700;
        }

        .node-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          animation: iconBounce 2s ease-in-out infinite;
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0px); }
          25% { transform: translateY(-5px); }
          75% { transform: translateY(2px); }
        }

        .node-title {
          font-size: 1.1rem;
          font-weight: bold;
          color: white;
          margin-bottom: 0.3rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }

        .node-description {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.9);
          margin-bottom: 0.5rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        }

        .node-level {
          background: rgba(255,255,255,0.2);
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.7rem;
          color: white;
          font-weight: bold;
          margin-bottom: 0.2rem;
        }

        .node-duration {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.8);
        }

        .animated-path {
          stroke-dashoffset: 0;
          animation: pathFlow 3s ease-in-out infinite;
        }

        @keyframes pathFlow {
          0% { stroke-dashoffset: 0; }
          50% { stroke-dashoffset: -20; }
          100% { stroke-dashoffset: 0; }
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .floating-skill {
          position: absolute;
          background: rgba(255,255,255,0.8);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          color: #2C5F7C;
          font-weight: bold;
          animation: skillFloat 4s ease-in-out infinite;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        @keyframes skillFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        }

        .start-journey-btn {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #4CAF50, #45a049);
          border: none;
          color: white;
          padding: 15px 30px;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(76,175,80,0.4);
          transition: all 0.3s ease;
          z-index: 10;
          animation: btnGlow 2s ease-in-out infinite;
        }

        @keyframes btnGlow {
          0%, 100% { box-shadow: 0 8px 25px rgba(76,175,80,0.4); }
          50% { box-shadow: 0 8px 35px rgba(76,175,80,0.6); }
        }

        .start-journey-btn:hover {
          transform: translateX(-50%) translateY(-5px);
          box-shadow: 0 12px 35px rgba(76,175,80,0.5);
        }

        .progress-indicator {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255,255,255,0.9);
          padding: 1rem;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          z-index: 10;
        }

        .progress-title {
          font-size: 0.9rem;
          font-weight: bold;
          color: #2C5F7C;
          margin-bottom: 0.5rem;
        }

        .progress-stats {
          font-size: 0.8rem;
          color: #546E7A;
        }

        @media (max-width: 768px) {
          .map-title {
            font-size: 2rem;
          }
          
          .skill-node {
            width: 150px;
            height: 150px;
            padding: 0.5rem;
          }
          
          .central-hub {
            width: 80px;
            height: 80px;
            font-size: 2rem;
          }
          
          .skills-map {
            height: 60vh;
            margin: 1rem;
          }
        }
      `}</style>

      <div className="map-header">
        <h1 className="map-title">🗺️ Skills Journey Map</h1>
        <p className="map-subtitle">Choose your path through the clouds of knowledge</p>
      </div>

      <div className="progress-indicator">
        <div className="progress-title">Journey Progress</div>
        <div className="progress-stats">
          🎯 Paths Available: 3<br/>
          🚀 Ready to Launch!
        </div>
      </div>

      <div className="skills-map">
        <div className="central-hub">
          🎯
        </div>

        {skillPaths
            .filter(path => pathCounts[path.id] > 3)
            .map((path, index) => (
                <div
                    key={path.id}
                    className={`skill-node ${selectedPath === path.id ? 'selected' : ''}`}
                    style={{
                        ...path.position,
                        background: `linear-gradient(135deg, ${path.color}, ${path.color}dd)`,
                        animationDelay: `${index * 0.5}s`
                    }}
                    onClick={() => handlePathSelect(path.id)}
                >
                    <div className="node-icon">{path.icon}</div>
                    <div className="node-title">{path.title}</div>
                    <div className="node-description">{path.description}</div>
                </div>
        ))}

        {renderPath(
          { x: '50%', y: '50%' },
          { x: '25%', y: '35%' },
          'path-to-devops'
        )}
        {renderPath(
          { x: '50%', y: '50%' },
          { x: '75%', y: '35%' },
          'path-to-pm'
        )}
        {renderPath(
          { x: '50%', y: '50%' },
          { x: '50%', y: '80%' },
          'path-to-webdev'
        )}

        <div className="floating-elements">
          <div className="floating-skill" style={{ top: '15%', left: '10%', animationDelay: '0s' }}>
            Docker 🐳
          </div>
          <div className="floating-skill" style={{ top: '20%', right: '10%', animationDelay: '1s' }}>
            Agile 📋
          </div>
          <div className="floating-skill" style={{ bottom: '15%', left: '20%', animationDelay: '2s' }}>
            React ⚛️
          </div>
          <div className="floating-skill" style={{ top: '40%', left: '5%', animationDelay: '0.5s' }}>
            AWS ☁️
          </div>
          <div className="floating-skill" style={{ top: '45%', right: '5%', animationDelay: '1.5s' }}>
            Scrum 🏃‍♂️
          </div>
          <div className="floating-skill" style={{ bottom: '25%', right: '25%', animationDelay: '2.5s' }}>
            Node.js 🟢
          </div>
        </div>
      </div>

      
    </div>
  );
}