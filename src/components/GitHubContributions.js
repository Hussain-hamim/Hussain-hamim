import React, { useState, useEffect } from "react";

const GitHubContributions = ({ username, dark = false }) => {
  const [contributions, setContributions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        let contributionMap = {};
        let totalContribsFromAPI = null;
        const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

        // Try GitHub GraphQL API first if token is available (more accurate)
        if (githubToken) {
          try {
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            const fromDate = oneYearAgo.toISOString().split('T')[0];
            const toDate = new Date().toISOString().split('T')[0];

            const graphqlQuery = {
              query: `
                query($username: String!, $from: DateTime!, $to: DateTime!) {
                  user(login: $username) {
                    contributionsCollection(from: $from, to: $to) {
                      contributionCalendar {
                        totalContributions
                        weeks {
                          contributionDays {
                            date
                            contributionCount
                          }
                        }
                      }
                    }
                  }
                }
              `,
              variables: {
                username: username,
                from: `${fromDate}T00:00:00Z`,
                to: `${toDate}T23:59:59Z`
              }
            };

            const response = await fetch('https://api.github.com/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${githubToken}`
              },
              body: JSON.stringify(graphqlQuery)
            });

            if (response.ok) {
              const data = await response.json();
              
              if (data.data?.user?.contributionsCollection?.contributionCalendar) {
                const calendar = data.data.user.contributionsCollection.contributionCalendar;
                totalContribsFromAPI = calendar.totalContributions || 0;
                
                calendar.weeks.forEach((week) => {
                  week.contributionDays.forEach((day) => {
                    if (day.date) {
                      const dateKey = day.date.split('T')[0];
                      contributionMap[dateKey] = day.contributionCount || 0;
                    }
                  });
                });

                console.log('Fetched contributions from GitHub API (accurate data)');
              }
            } else {
              const errorData = await response.json();
              console.warn('GitHub API error:', errorData);
            }
          } catch (error) {
            console.error("Error fetching from GitHub API:", error);
          }
        }

        // Fallback to public API if no token or if GitHub API failed
        if (Object.keys(contributionMap).length === 0) {
          try {
            const contributionsResponse = await fetch(
              `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
            );

            if (contributionsResponse.ok) {
              const data = await contributionsResponse.json();
              
              if (data.contributions && Array.isArray(data.contributions)) {
                data.contributions.forEach((contribution) => {
                  if (contribution.date) {
                    const dateKey = contribution.date;
                    const count = contribution.count || 0;
                    contributionMap[dateKey] = count;
                  }
                });
              } else if (data.data && Array.isArray(data.data)) {
                data.data.forEach((contribution) => {
                  if (contribution.date) {
                    contributionMap[contribution.date] = contribution.count || 0;
                  }
                });
              }
              console.log('Fetched contributions from public API (may be less accurate)');
            }
          } catch (error) {
            console.error("Error fetching from contributions API:", error);
          }
        }

        // Generate full year of weeks (52 weeks)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Start from 371 days ago (approximately 53 weeks to ensure we cover full year)
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - 371);
        
        // Find the Sunday before or on the start date
        const startDayOfWeek = startDate.getDay();
        const firstSunday = new Date(startDate);
        firstSunday.setDate(startDate.getDate() - startDayOfWeek);
        
        const weeks = [];
        const monthPositions = new Map();
        let totalCount = 0;
        
        // Generate 53 weeks to ensure we cover full year
        for (let week = 0; week < 53; week++) {
          const weekStart = new Date(firstSunday);
          weekStart.setDate(firstSunday.getDate() + week * 7);
          
          const weekDays = [];
          for (let day = 0; day < 7; day++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + day);
            
            // Only include dates within the last year
            if (date <= today) {
              const dateKey = date.toISOString().split("T")[0];
              const count = contributionMap[dateKey] || 0;
              totalCount += count;
              weekDays.push({ date, count });
              
              // Track first occurrence of each month for labels
              if (date.getDate() === 1 && !monthPositions.has(date.getMonth())) {
                const monthName = date.toLocaleDateString("en-US", { month: "short" });
                monthPositions.set(date.getMonth(), { name: monthName, weekIndex: week });
              }
            } else {
              weekDays.push({ date: null, count: 0 });
            }
          }
          
          weeks.push(weekDays);
        }
        
        // Convert map to array sorted by week index
        const sortedMonths = Array.from(monthPositions.values()).sort((a, b) => a.weekIndex - b.weekIndex);
        
        // Use total from GitHub API if available, otherwise calculate from map
        setTotalContributions(totalContribsFromAPI !== null ? totalContribsFromAPI : totalCount);
        setContributions({ weeks, monthPositions: sortedMonths });
      } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
        generateEmptyContributions();
      } finally {
        setLoading(false);
      }
    };

    const generateEmptyContributions = () => {
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - 371);
      
      const startDayOfWeek = startDate.getDay();
      const firstSunday = new Date(startDate);
      firstSunday.setDate(startDate.getDate() - startDayOfWeek);
      
      const weeks = [];
      const monthPositions = new Map();
      
      for (let week = 0; week < 53; week++) {
        const weekStart = new Date(firstSunday);
        weekStart.setDate(firstSunday.getDate() + week * 7);
        
        const weekDays = [];
        for (let day = 0; day < 7; day++) {
          const date = new Date(weekStart);
          date.setDate(weekStart.getDate() + day);
          
          if (date <= today) {
            weekDays.push({ date, count: 0 });
            
            // Track first occurrence of each month for labels
            if (date.getDate() === 1 && !monthPositions.has(date.getMonth())) {
              const monthName = date.toLocaleDateString("en-US", { month: "short" });
              monthPositions.set(date.getMonth(), { name: monthName, weekIndex: week });
            }
          } else {
            weekDays.push({ date: null, count: 0 });
          }
        }
        
        weeks.push(weekDays);
      }
      
      const sortedMonths = Array.from(monthPositions.values()).sort((a, b) => a.weekIndex - b.weekIndex);
      setTotalContributions(0);
      setContributions({ weeks, monthPositions: sortedMonths });
    };

    if (username) {
      fetchContributions();
    } else {
      generateEmptyContributions();
    }
  }, [username]);

  const getIntensity = (count) => {
    // GitHub's exact color scheme
    if (count === 0) return "bg-[#161b22]";
    if (count === 1) return "bg-[#0e4429]";
    if (count <= 3) return "bg-[#006d32]";
    if (count <= 5) return "bg-[#26a641]";
    return "bg-[#39d353]";
  };

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="h-4 bg-gray-700 rounded w-48 animate-pulse"></div>
        <div className="flex gap-1">
          <div className="w-12"></div>
          <div className="flex gap-1 flex-1">
            {Array.from({ length: 53 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, j) => (
                  <div
                    key={j}
                    className="w-3 h-3 rounded bg-[#161b22] animate-pulse"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!contributions) return null;

  return (
    <div className="space-y-3 w-full">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-white">
          {totalContributions.toLocaleString()} contributions in the last year
        </h4>
      </div>

      {/* Graph Container */}
      <div className="flex gap-2" style={{ minWidth: 'max-content' }}>
        {/* Day Labels */}
        <div className="flex flex-col gap-1 pt-3 flex-shrink-0">
          {dayLabels.map((label, idx) => (
            <div
              key={idx}
              className="h-3 flex items-center justify-end pr-2"
            >
              {label && (
                <span className="text-[10px] text-gray-400 leading-none whitespace-nowrap">
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Main Graph */}
        <div className="flex-shrink-0">
          {/* Month Labels */}
          <div className="flex gap-1 mb-1 relative h-4" style={{ width: `${53 * 16}px` }}>
            {contributions.monthPositions.map((month, idx) => {
              const nextMonth = contributions.monthPositions[idx + 1];
              // Each week: w-3 (12px) + gap-1 (4px) = 16px total
              const weekWidth = 16;
              const leftPosition = month.weekIndex * weekWidth;
              const width = nextMonth
                ? (nextMonth.weekIndex - month.weekIndex) * weekWidth
                : (53 - month.weekIndex) * weekWidth;
              return (
                <div
                  key={idx}
                  className="absolute"
                  style={{
                    left: `${leftPosition}px`,
                    minWidth: `${width}px`,
                  }}
                >
                  <span className="text-[10px] text-gray-400 leading-none whitespace-nowrap">
                    {month.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Contribution Grid */}
          <div className="flex gap-1" style={{ width: `${53 * 16}px` }}>
            {contributions.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded ${
                      day.date ? getIntensity(day.count) : "bg-transparent"
                    }`}
                    title={
                      day.date
                        ? `${day.date.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`
                        : ""
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 text-[10px] text-gray-400">
        <span>Less</span>
        <div className="flex gap-0.5">
          <div className="w-3 h-3 rounded bg-[#161b22]"></div>
          <div className="w-3 h-3 rounded bg-[#0e4429]"></div>
          <div className="w-3 h-3 rounded bg-[#006d32]"></div>
          <div className="w-3 h-3 rounded bg-[#26a641]"></div>
          <div className="w-3 h-3 rounded bg-[#39d353]"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default GitHubContributions;
