import React from 'react';

const NeonPopup = ({ onStart }) => {
  const modalStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1050,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Segoe UI, sans-serif',
  };

  const dialogStyles = {
    width: '600px',
    maxWidth: '90%',
    background: 'rgba(0, 0, 0, 0.6)',
    border: '2px solid #00ffcc',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 30px #00ffcc',
    padding: '30px',
    color: '#ffffff',
  };

  const headerStyles = {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#00ffcc',
    textShadow: '0 0 10px #00ffcc',
    textAlign: 'center',
  };

  const bodyStyles = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#ffffff',
    marginBottom: '20px',
  };

  const listStyles = {
    paddingLeft: '20px',
    marginBottom: '20px',
  };

  const footerStyles = {
    display: 'flex',
    justifyContent: 'center',
  };

  const buttonStyles = {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #00ffcc, #0066ff)',
    border: 'none',
    borderRadius: '30px',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 0 20px #00ffcc, 0 0 40px #0066ff',
    transition: 'transform 0.2s ease-in-out',
  };

  const buttonHover = {
    transform: 'scale(1.05)',
  };

  return (
    <div style={modalStyles}>
      <div style={dialogStyles}>
        <div style={headerStyles}>🚀 Interview Instructions</div>
        <div style={bodyStyles}>
          <p>Welcome to the interview! Here's how it works:</p>
          <ul style={listStyles}>
            <li>Questions will be displayed one at a time.</li>
            <li>Answer each question thoughtfully in the text box provided.</li>
            <li>Some questions may include a video for context. Watch it carefully.</li>
            <li>Click "Submit Answer" or press "Enter" to proceed to the next question.</li>
          </ul>
          <p>Click "Start Interview" when you're ready.</p>
        </div>
        <div style={footerStyles}>
          <button
            style={buttonStyles}
            onMouseOver={(e) => Object.assign(e.target.style, buttonHover)}
            onMouseOut={(e) => Object.assign(e.target.style, buttonStyles)}
            onClick={onStart}
          >
            🎮 Start Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeonPopup;
