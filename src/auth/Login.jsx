import React from 'react'
import GoogleLogin from './GoogleLogin'

function Login() {
  return (
    <div className="sky-login-container">
      <div className="clouds cloud-1"></div>
      <div className="clouds cloud-2"></div>
      <div className="clouds cloud-3"></div>
      <div className="clouds cloud-4"></div>
      
      <div className="stars">
        <div className="star star-1"></div>
        <div className="star star-2"></div>
        <div className="star star-3"></div>
        <div className="star star-4"></div>
        <div className="star star-5"></div>
        <div className="star star-6"></div>
      </div>

      <div className="login-card">
        <div className="card-glow"></div>
        <div className="welcome-section">
          <h1 className="game-title">Hire-Genius</h1>
          <p className="subtitle">Begin Your Adventure</p>
          <div className="level-badge">
            <span className="level-text">HR Interview</span>
            <div className="xp-bar">
              <div className="xp-fill"></div>
            </div>
          </div>
        </div>
        
        <div className="login-section">
          <GoogleLogin />
          <p className="login-hint">
            🌟 Sign in to unlock your sky adventure!
          </p>
        </div>
      </div>

      <style jsx>{`
        .sky-login-container {
          min-height: 100vh;
          background: linear-gradient(
            to bottom,
            #87CEEB 0%,
            #98D8E8 25%,
            #B6E5F0 50%,
            #E0F6FF 75%,
            #F0F8FF 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Arial', sans-serif;
        }

        .clouds {
          position: absolute;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50px;
          animation: float 20s infinite linear;
        }

        .cloud-1 {
          width: 100px;
          height: 40px;
          top: 10%;
          left: -100px;
          animation-duration: 25s;
        }

        .cloud-2 {
          width: 80px;
          height: 30px;
          top: 30%;
          left: -80px;
          animation-duration: 30s;
          animation-delay: -5s;
        }

        .cloud-3 {
          width: 120px;
          height: 50px;
          top: 20%;
          left: -120px;
          animation-duration: 35s;
          animation-delay: -10s;
        }

        .cloud-4 {
          width: 90px;
          height: 35px;
          top: 60%;
          left: -90px;
          animation-duration: 28s;
          animation-delay: -15s;
        }

        .clouds::before {
          content: '';
          position: absolute;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50px;
          width: 60%;
          height: 80%;
          top: -20%;
          left: 20%;
        }

        .clouds::after {
          content: '';
          position: absolute;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50px;
          width: 40%;
          height: 60%;
          top: -10%;
          right: 15%;
        }

        @keyframes float {
          from {
            transform: translateX(-100px);
          }
          to {
            transform: translateX(calc(100vw + 100px));
          }
        }

        .stars {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .star {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #FFD700;
          border-radius: 50%;
          animation: twinkle 3s infinite alternate;
        }

        .star-1 { top: 15%; left: 20%; animation-delay: 0s; }
        .star-2 { top: 25%; right: 30%; animation-delay: 0.5s; }
        .star-3 { top: 35%; left: 70%; animation-delay: 1s; }
        .star-4 { top: 45%; right: 20%; animation-delay: 1.5s; }
        .star-5 { top: 55%; left: 40%; animation-delay: 2s; }
        .star-6 { top: 65%; right: 50%; animation-delay: 2.5s; }

        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.2); }
        }

        .login-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 40px;
          width: 400px;
          text-align: center;
          position: relative;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          animation: cardFloat 6s ease-in-out infinite;
        }

        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .card-glow {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #FFD700, #FF69B4, #00BFFF, #FFD700);
          border-radius: 22px;
          z-index: -1;
          opacity: 0;
          animation: glowPulse 4s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.3; }
        }

        .welcome-section {
          margin-bottom: 30px;
        }

        .game-title {
          font-size: 2.5rem;
          font-weight: bold;
          background: linear-gradient(45deg, #4169E1, #1E90FF, #00BFFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 10px 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .subtitle {
          color: #2E5BBA;
          font-size: 1.1rem;
          margin: 0 0 20px 0;
          font-weight: 500;
        }

        .level-badge {
          display: inline-block;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          padding: 8px 16px;
          border-radius: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .level-text {
          color: white;
          font-weight: bold;
          font-size: 0.9rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .xp-bar {
          width: 90px;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
          margin-top: 4px;
          overflow: hidden;
        }

        .xp-fill {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #00FF7F, #32CD32);
          border-radius: 2px;
          animation: xpGlow 2s ease-in-out infinite alternate;
        }

        @keyframes xpGlow {
          0% { box-shadow: 0 0 5px #00FF7F; }
          100% { box-shadow: 0 0 15px #00FF7F; }
        }

        .sky-login-btn {
          background: linear-gradient(135deg, #4285F4, #34A853, #4285F4);
          background-size: 200% 200%;
          border: none;
          border-radius: 50px;
          padding: 15px 30px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 
            0 8px 16px rgba(66, 133, 244, 0.3),
            0 4px 8px rgba(0, 0, 0, 0.1);
          animation: btnPulse 3s ease-in-out infinite;
        }

        @keyframes btnPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        .sky-login-btn:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 
            0 12px 24px rgba(66, 133, 244, 0.4),
            0 8px 16px rgba(0, 0, 0, 0.2);
          background-position: 100% 0;
        }

        .sky-login-btn:active {
          transform: translateY(0) scale(1.02);
        }

        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          position: relative;
          z-index: 2;
        }

        .google-icon {
          background: white;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .sparkle {
          position: absolute;
          font-size: 12px;
          animation: sparkleFloat 2s ease-in-out infinite;
          pointer-events: none;
        }

        .sparkle-1 {
          top: -5px;
          left: 10px;
          animation-delay: 0s;
        }

        .sparkle-2 {
          top: -8px;
          right: 15px;
          animation-delay: 0.7s;
        }

        .sparkle-3 {
          bottom: -5px;
          left: 20px;
          animation-delay: 1.4s;
        }

        @keyframes sparkleFloat {
          0%, 100% { 
            opacity: 0; 
            transform: translateY(0) scale(0.8); 
          }
          50% { 
            opacity: 1; 
            transform: translateY(-10px) scale(1.2); 
          }
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transition: left 0.5s;
        }

        .sky-login-btn:hover .btn-shine {
          left: 100%;
        }

        .login-hint {
          color: #5A7FC7;
          font-size: 0.9rem;
          margin-top: 20px;
          animation: hintGlow 3s ease-in-out infinite alternate;
        }

        @keyframes hintGlow {
          0% { opacity: 0.7; }
          100% { opacity: 1; }
        }

        @media (max-width: 480px) {
          .login-card {
            width: 90%;
            padding: 30px 20px;
          }
          
          .game-title {
            font-size: 2rem;
          }
          
          .sky-login-btn {
            width: 100%;
            padding: 18px 30px;
          }
        }
      `}</style>
    </div>
  )
}

export default Login
