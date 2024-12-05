import React from 'react';

export default function Test() {

    const handleReset = () => {
    localStorage.clear();
    alert('Local storage has been reset.');
    window.location.href = "/dashboard"; 
  };

  return (
    <div className="container mt-4">
      <h4 className="text-center mb-4">Reset Local Storage</h4>
      <div className="d-flex justify-content-center">
        <button className="btn btn-danger" onClick={handleReset}>
          Reset Local Storage
        </button>
      </div>
    </div>
  );
}
