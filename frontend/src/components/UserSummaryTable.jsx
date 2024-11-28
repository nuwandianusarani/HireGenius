import React, { useState } from "react";

export const UserSummaryTable = ({ userData }) => {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    setApiResponse(null);

    const apiUrl = "http://127.0.0.1:5000/predict";
    const requestBody = {
      features: [
        userData.totalCommits,
        userData.maxStreak,
        userData.commitFrequency,
        userData.commitConsistency,
      ],
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      setApiResponse(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px auto", width: "80%" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>
              User Name
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>
              Total Commits
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>
              Max Streak
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>
              Average Weekly Commits
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>
              Current Streak
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>
              Commit Frequency
            </th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>
              Commit Consistency (Strike Rate)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              {userData.userName}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              {userData.totalCommits}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              {userData.maxStreak}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              {userData.averageWeeklyCommits.toFixed(2)}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              {userData.currentStreak}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              {(userData.commitFrequency * 100).toFixed(2)}%
            </td>
            <td style={{ border: "1px solid #ddd", padding: "12px" }}>
              {(userData.commitConsistency * 100).toFixed(2)}%
            </td>
          </tr>
        </tbody>
      </table>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#004080",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s ease",
        }}
        onClick={handlePredict}
        disabled={loading}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {apiResponse && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Marks: {apiResponse.marks}
          </p>
          <p style={{ fontSize: "1rem" }}>
            Prediction: {apiResponse.prediction}
          </p>
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#ffe6e6",
            color: "#cc0000",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{ fontSize: "1rem" }}>Error: {error}</p>
        </div>
      )}
    </div>
  );
};
