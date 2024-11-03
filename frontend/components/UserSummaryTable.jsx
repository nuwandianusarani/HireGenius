import React from "react";

export const UserSummaryTable = ({ userData }) => {
  return (
    <table
      style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
    >
      <thead>
        <tr>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            User Name
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Total Commits
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Max Streak
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Average Weekly Commits
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Current Streak
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Commit Frequency
          </th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>
            Commit Consistency (Strike Rate)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            {userData.userName}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            {userData.totalCommits}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            {userData.maxStreak}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            {userData.averageWeeklyCommits.toFixed(2)}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            {userData.currentStreak}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            {(userData.commitFrequency * 100).toFixed(2)}%
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            {(userData.commitConsistency * 100).toFixed(2)}%
          </td>
        </tr>
      </tbody>
    </table>
  );
};
