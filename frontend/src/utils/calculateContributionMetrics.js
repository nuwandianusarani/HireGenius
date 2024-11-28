export function calculateContributionMetrics(weeks, userName) {
  let totalCommits = 0;
  let maxStreak = 0;
  let currentStreak = 0;
  let activeDays = 0;
  let weeklyCommitCounts = [];
  let streak = 0;

  weeks.forEach((week) => {
    let weeklyCommits = 0;
    week.contributionDays.forEach((day) => {
      const { contributionCount } = day;
      totalCommits += contributionCount;
      weeklyCommits += contributionCount;

      if (contributionCount > 0) {
        streak++;
        activeDays++;
        if (streak > maxStreak) maxStreak = streak;
      } else {
        streak = 0;
      }
    });
    weeklyCommitCounts.push(weeklyCommits);
  });

  // Average weekly commits
  const averageWeeklyCommits = totalCommits / weeklyCommitCounts.length;

  // Current streak calculation
  currentStreak = streak;

  // Commit frequency and consistency (strike rate)
  const totalDays = weeks.length * 7;
  const commitFrequency = activeDays / totalDays;
  const commitConsistency =
    weeklyCommitCounts.filter((count) => count > 0).length /
    weeklyCommitCounts.length;

  return {
    totalCommits,
    maxStreak,
    averageWeeklyCommits,
    currentStreak,
    commitFrequency,
    commitConsistency,
    userName,
  };
}
