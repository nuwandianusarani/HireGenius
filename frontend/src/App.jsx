import React, { useEffect, useState, useRef } from "react";
import { ContributionChart } from "./components/ContributionChart";
import { retrieveContributionData } from "./services/githubService.js";
import { calculateContributionMetrics } from "./utils/calculateContributionMetrics.js";
import { UserSummaryTable } from "./components/UserSummaryTable";

const MAIN_AUTHOR_USER_NAME = "yasas4d";

const Header = () => (
  <header
    style={{
      backgroundColor: "#004080",
      padding: "20px",
      color: "white",
      textAlign: "center",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <h1 style={{ margin: "0", fontSize: "2.5rem" }}>HireGenius</h1>
    <p style={{ margin: "10px 0 0", fontSize: "1.2rem" }}>
      Empowering your hiring process with GitHub insights
    </p>
  </header>
);

const Footer = () => (
  <footer
    style={{
      backgroundColor: "#004080",
      color: "white",
      padding: "10px 20px",
      marginTop: "40px",
      textAlign: "center",
      fontSize: "0.9rem",
    }}
  >
    <p>&copy; {new Date().getFullYear()} HireGenius. All Rights Reserved.</p>
    <p>Built with ❤️ by HireGenius Team</p>
  </footer>
);

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
      <Header />
      <SearchArea userName={userName} onSearch={setUserName} />
      <ChartArea
        contributionDays={contributionDays}
        totalContributions={totalContributions}
        userName={userName}
      />

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h1>GitHub User Contribution Summary</h1>
        {metrics ? <UserSummaryTable userData={metrics} /> : <p>Loading...</p>}
      </div>
      <Footer />
    </div>
  );
};

export default App;
