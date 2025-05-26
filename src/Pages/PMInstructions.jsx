import React, { useState } from 'react';
import { Cloud, Users, Timer, Heart, UserX, TrendingUp, ChevronDown, ChevronUp, Play, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PMInstructions = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const navigate = useNavigate();

  const instructions = [
    {
      title: "Task Delivery System",
      icon: <Cloud className="instruction-icon" />,
      content: "Tasks descend one by one. Pay attention to each task & consider which role is more suitable for handling this task.",
      details: "Each task appears one by one with the time. Monitor tasks and prepare your team accordingly."
    },
    {
      title: "Team Environment",
      icon: <Users className="instruction-icon" />,
      content: "Your environment consists of four specialized team members: Software Engineer (SE), Quality Assurance (QA), Business Analyst (BA), and DevOps Engineer.",
      details: "Each team member has unique skills and capacity limits. SE handles development, QA ensures quality, BA manages requirements, and DevOps handles deployment and infrastructure."
    },
    {
      title: "Drag & Drop Assignment",
      icon: <Timer className="instruction-icon" />,
      content: "Once tasks appear, drag and drop them to the appropriate team members within the given time window before they drift away.",
      details: "Quick decision-making is crucial. Tasks have limited assignment windows, and delayed assignments can increase project stress."
    },
    {
      title: "Sick Leave Feature",
      icon: <Heart className="instruction-icon" />,
      content: "Team members may take sick leave, appearing grayed out and unavailable. During this time, they cannot receive new task assignments.",
      details: "Plan alternative assignments when team members are unavailable. Sick leave duration varies, and overloading remaining members increases stress."
    },
    {
      title: "Multi-Role Collaboration",
      icon: <UserX className="instruction-icon" />,
      content: "Many tasks require collaboration between multiple team members. Assign collaborative tasks carefully to ensure all required roles are available.",
      details: "Some tasks need sequential work (SE → QA), while others require parallel collaboration. Check tasks before assignment."
    },
    {
      title: "Project Stress Meter",
      icon: <TrendingUp className="instruction-icon" />,
      content: "The stress meter rises when tasks expire, team members become overloaded, or wrong assignments are made. Keep it low to maintain team productivity!",
      details: "High stress affects team performance. Monitor workload distribution and make strategic assignments to keep stress levels manageable."
    }
  ];

  const handleNavigate = () => {
    navigate('/GameBoard');
  }

  return (
    <div className="pm-instructions">
      <div className="sky-background">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>
      
      <div className="instructions-container">
        <h1 className="instructions-title">
          <Cloud className="title-icon" />
          Project Management Challenge
          <Cloud className="title-icon" />
        </h1>
        
        <div className="instructions-subtitle">
          Review instructions before staring the challenge of project management!
        </div>

        <div className="instructions-list">
          {instructions.map((instruction, index) => (
            <div key={index} className="instruction-card">
              <div 
                className="instruction-header"
                onClick={() => toggleSection(index)}
              >
                <div className="instruction-left">
                  {instruction.icon}
                  <h3 className="instruction-title-text">{instruction.title}</h3>
                </div>
                <div className="expand-icon">
                  {expandedSection === index ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>
              
              <div className="instruction-content">
                <p className="instruction-summary">{instruction.content}</p>
                
                {expandedSection === index && (
                  <div className="instruction-details">
                    <p>{instruction.details}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className='button-wrapper'>
          <button className="start-challenge-btn" onClick={handleNavigate}>
            <div className="btn-content">
              <Play className="btn-icon" />
              <span className="btn-text">Start Challenge</span>
              <Zap className="btn-accent" />
            </div>
            <div className="btn-glow"></div>
          </button>
        </div>

        <div className="game-tip">
          <div className="tip-icon">💡</div>
          <p><strong>Pro Tip:</strong> Keep an eye on the environment, balance your team's workload, and remember - a happy team is a productive team!</p>
        </div>
      </div>


      <style jsx>{`
        .pm-instructions {
          position: relative;
          height: 100vh;
          background: linear-gradient(135deg, #87CEEB 0%, #E0F6FF 50%, #B0E0E6 100%);
          padding: 20px;
          font-family: 'Arial', sans-serif;
          overflow-x: hidden;
        }

        .sky-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .cloud {
          position: absolute;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 50px;
          opacity: 0.6;
          animation: float 20s infinite ease-in-out;
        }

        .cloud-1 {
          width: 100px;
          height: 40px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .cloud-2 {
          width: 80px;
          height: 35px;
          top: 20%;
          right: 15%;
          animation-delay: -7s;
        }

        .cloud-3 {
          width: 120px;
          height: 45px;
          top: 60%;
          left: 5%;
          animation-delay: -14s;
        }

        .cloud::before,
        .cloud::after {
          content: '';
          position: absolute;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 50px;
        }

        .cloud::before {
          width: 50px;
          height: 50px;
          top: -25px;
          left: 10px;
        }

        .cloud::after {
          width: 60px;
          height: 60px;
          top: -35px;
          right: 15px;
        }

        @keyframes float {
          0%, 100% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(10px) translateY(-5px); }
          50% { transform: translateX(-5px) translateY(5px); }
          75% { transform: translateX(5px) translateY(-3px); }
        }

        .instructions-container {
          position: relative;
          z-index: 2;
          max-width: 600px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }

        .instructions-title {
          text-align: center;
          color: #2C5AA0;
          font-size: 1.5rem;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .title-icon {
          color: #87CEEB;
          width: 40px;
          height: 40px;
        }

        .instructions-subtitle {
          text-align: center;
          color: #5A7BA7;
          font-size: 1rem;
          margin-bottom: 30px;
          font-style: italic;
        }

        .instructions-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 25px;
        }

        .instruction-card {
          background: linear-gradient(135deg, #F0F8FF 0%, #E6F3FF 100%);
          border-radius: 15px;
          border: 2px solid #B0D4F1;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .instruction-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(44, 90, 160, 0.15);
        }

        .instruction-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          cursor: pointer;
          background: rgba(135, 206, 235, 0.1);
        }

        .instruction-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .instruction-icon {
          color: #2C5AA0;
          width: 20px;
          height: 20px;
        }

        .instruction-title-text {
          color: #2C5AA0;
          font-size: 1rem;
          margin: 0;
          font-weight: 600;
        }

        .expand-icon {
          color: #5A7BA7;
          transition: transform 0.3s ease;
        }

        .instruction-content {
          padding: 0 20px 20px 20px;
        }

        .instruction-summary {
          color: #4A5568;
          font-size: 0.85rem;
          line-height: 1.6;
          margin: 0;
        }

        .instruction-details {
          margin-top: 15px;
          padding: 15px;
          background: rgba(135, 206, 235, 0.1);
          border-radius: 10px;
          border-left: 4px solid #87CEEB;
          animation: fadeIn 0.3s ease-in-out;
        }

        .instruction-details p {
          color: #2D3748;
          margin: 0;
          font-size: 0.75rem;
          line-height: 1.5;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .game-tip {
          background: linear-gradient(135deg, #FFE4B5 0%, #FFF8DC 100%);
          border-radius: 15px;
          padding: 10px;
          border: 2px solid #DEB887;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .tip-icon {
          font-size: 1rem;
          flex-shrink: 0;
        }

        .game-tip p {
          color: #8B4513;
          margin: 0;
          font-size: 1rem;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .pm-instructions {
            padding: 15px;
          }

          .instructions-container {
            padding: 20px;
          }

          .instructions-title {
            font-size: 2rem;
            flex-direction: column;
            gap: 10px;
          }

          .instruction-header {
            padding: 15px;
          }

          .instruction-title-text {
            font-size: 1rem;
          }

          .cloud {
            display: none;
          }
        }

        .start-challenge-btn {
            position: relative;
            background: linear-gradient(135deg, #4A90E2 0%, #2C5AA0 100%);
            border: none;
            border-radius: 25px;
            padding: 18px 40px;
            cursor: pointer;
            font-family: 'Arial', sans-serif;
            font-size: 1.2rem;
            font-weight: 600;
            color: white;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
            box-shadow: 
              0 8px 20px rgba(74, 144, 226, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            overflow: hidden;
            transform: translateY(0);
            margin: 0 auto;
            display: block;
            margin-bottom: 20px
          }

          .start-challenge-btn:hover {
            transform: translateY(-3px);
            box-shadow: 
              0 12px 30px rgba(74, 144, 226, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.3);
            background: linear-gradient(135deg, #5BA0F2 0%, #3D6BB0 100%);
          }

          .start-challenge-btn:active {
            transform: translateY(-1px);
            box-shadow: 
              0 6px 15px rgba(74, 144, 226, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }

          .btn-content {
            display: flex;
            align-items: center;
            gap: 12px;
            position: relative;
            z-index: 2;
          }

          .btn-icon {
            width: 20px;
            height: 20px;
            animation: pulse 2s infinite;
          }

          .btn-text {
            letter-spacing: 0.5px;
          }

          .btn-accent {
            width: 18px;
            height: 18px;
            color: #FFD700;
            animation: sparkle 1.5s infinite alternate;
          }

          .btn-glow {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            border-radius: 25px;
            opacity: 0;
            transition: opacity 0.3s ease;
            animation: shimmer 3s infinite;
          }

          .start-challenge-btn:hover .btn-glow {
            opacity: 1;
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }

          @keyframes sparkle {
            0% { opacity: 0.7; transform: rotate(0deg); }
            100% { opacity: 1; transform: rotate(180deg); }
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          @media (max-width: 768px) {
            .start-challenge-btn {
              padding: 15px 30px;
              font-size: 1.1rem;
            }
            
            .btn-content {
              gap: 10px;
            }
            
            .btn-icon, .btn-accent {
              width: 18px;
              height: 18px;
            }
          
          .button-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh; /* Optional: makes the button vertically centered within the full viewport */
          }

      `}</style>
    </div>
  );
};

export default PMInstructions;