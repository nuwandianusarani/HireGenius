import React from 'react';

const NeonPopup = ({ onStart }) => {
  return (
    <div className="modal d-block neon-green-border" tabIndex="-1" role="dialog" style={{ minWidth:'100%'}}>
      <div className="modal-dialog" role="document">
        <div className="modal-content rainbow-bg">
          <div className="modal-header">
            <h5 className="modal-title text-black">Interview Instructions</h5>
          </div>
          <div className="modal-body text-black">
            <p>Welcome to the interview! Here's how it works:</p>
            <ul>
              <li>Questions will be displayed one at a time.</li>
              <li>Answer each question thoughtfully in the text box provided.</li>
              <li>Some questions may include a video for context. Watch it carefully.</li>
              <li>Click "Submit Answer" or press "Enter" to proceed to the next question.</li>
            </ul>
            <p>Click "Start Interview" when you're ready.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn neon-button"
              onClick={onStart}
            >
              Start Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeonPopup;