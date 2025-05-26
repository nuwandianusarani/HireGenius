import React, { useEffect } from 'react';
import '../assets/css/ThanksPage.css'; 

export default function ThanksPage() {


  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h2 className="thanks-text fw-bold mb-3">Thank You!</h2>
      <p className="fs-5 text-white">
        We appreciate your time and effort in completing the interview. <br />
        Our team will review your responses, and one of our agents will get in touch with you regarding the next steps.
      </p>
      <div className="mt-4">
        <button className="btn btn-primary result-btn" onClick={() => window.location.href = "/"}>
          Back to Home
        </button>
        <button className="btn btn-success result-btn ms-3" onClick={() => window.location.href = "/results"}>
          View Results
        </button>
      </div>
    </div>
  );
}
