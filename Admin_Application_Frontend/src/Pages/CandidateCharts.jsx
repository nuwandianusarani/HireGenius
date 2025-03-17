import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CandidateCharts = () => {
  const { candidateID } = useParams();
  const navigate = useNavigate();
  const [charts, setCharts] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/candidates/charts/${candidateID}`);
        setCharts(response.data.charts);
      } catch (error) {
        setError("Failed to load charts.");
        console.error("Error fetching charts:", error);
      }
    };
    fetchCharts();
  }, [candidateID]);

  return (
    <div className="charts-container">
      <button onClick={() => navigate(-1)}>Go Back</button>
      <h1>Candidate Charts</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        Object.keys(charts).length > 0 ? (
          Object.entries(charts).map(([category, data]) => (
            <div key={category} className="chart-item">
              <h3>{category}</h3>
              {data.chart ? (
                <img src={`data:image/png;base64,${data.chart}`} alt={`${category} Chart`} />
              ) : (
                <p>No chart available</p>
              )}
            </div>
          ))
        ) : (
          <p>Loading charts...</p>
        )
      )}
    </div>
  );
};

export default CandidateCharts;
