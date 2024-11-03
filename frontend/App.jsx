import React, { useEffect, useState, useRef } from "react";
import { ContributionChart } from "./components/ContributionChart";
import { retrieveContributionData } from "./services/githubService.js";
import { calculateContributionMetrics } from "./utils/calculateContributionMetrics.js";
import { UserSummaryTable } from "./components/UserSummaryTable";

const MAIN_AUTHOR_USER_NAME = "yasas4d";

const ChartArea = ({ totalContributions, contributionDays, userName }) => (
  <>
    <h1>
      GitHub Contributions of{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://github.com/${userName}`}
      >
        {userName}
      </a>
    </h1>
    <h2>Total Contributions: {totalContributions}</h2>
    <h2>Accumulation of Contributions Over One Year</h2>
    <ContributionChart contributionDays={contributionDays} />
  </>
);

const SearchArea = ({ userName, onSearch }) => {
  const ref = useRef(null);
  const handleClick = (e) => {
    e.preventDefault();
    const newUserName = ref.current?.value || MAIN_AUTHOR_USER_NAME;
    onSearch(newUserName);
  };
  return (
    <div style={{ marginTop: "120px" }}>
      Type in Another GitHub Account ID Below to See Contributions
      <form style={{ marginTop: "12px" }}>
        <input ref={ref} type="text" placeholder={userName} />
        <button type="submit" onClick={handleClick}>
          Look
        </button>
      </form>
    </div>
  );
};

const AuthorArea = () => (
  <div style={{ marginTop: "120px" }}>
    <p>
      Source Code Here:{" "}
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/your-repo-url" // Replace with actual repo URL
      >
        GitHub Repo
      </a>
    </p>
    <p>
      Author:{" "}
      <a
        rel="noopener noreferrer"
        target="_blank"
        href={`https://github.com/${MAIN_AUTHOR_USER_NAME}`}
      >
        {MAIN_AUTHOR_USER_NAME}
      </a>
    </p>
  </div>
);

const App = () => {
  const [userName, setUserName] = useState(MAIN_AUTHOR_USER_NAME);
  const [totalContributions, setTotalContributions] = useState(0);
  const [metrics, setMetrics] = useState(null);
  const [contributionDays, setContributionDays] = useState([]);

  const fetchContributionData = async (username) => {
    const { userName, weeks } = await retrieveContributionData(username);

    // Calculate metrics for the summary table
    const calculatedMetrics = calculateContributionMetrics(weeks, userName);

    // Flatten contribution days for chart component
    const contributionDays = weeks.flatMap((week) => week.contributionDays);

    // Set states
    setTotalContributions(calculatedMetrics.totalContributions);
    setContributionDays(contributionDays);
    setMetrics(calculatedMetrics);
  };

  useEffect(() => {
    fetchContributionData(userName);
  }, [userName]);

  return (
    <div
      style={{
        textAlign: "center",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <ChartArea
        contributionDays={contributionDays}
        totalContributions={totalContributions}
        userName={userName}
      />
      <SearchArea userName={userName} onSearch={setUserName} />
      <AuthorArea />
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h1>GitHub User Contribution Summary</h1>
        {metrics ? <UserSummaryTable userData={metrics} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default App;
