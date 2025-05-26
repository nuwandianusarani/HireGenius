import React from "react";

const Modal = ({ children, onClose }) => (
  <div
    className="modal show d-block"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  </div>
);

export default Modal;
