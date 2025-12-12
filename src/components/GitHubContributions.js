import React, { useState, useEffect } from "react";

const GitHubContributions = ({ username }) => {
  const [contributions, setContributions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        let contributionMap = {};

        // Use GitHub Contribution Graph API via a public service
        // Since GitHub API has CORS/rate limit issues, we'll use github-contributions-api
        try {
          // Try using github-contributions-api service
          const contributionsResponse = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
          );

          if (contributionsResponse.ok) {
            const data = await contributionsResponse.json();
            console.log("Contributions API response:", data);

            // The API returns contributions in different possible formats
            if (data.contributions && Array.isArray(data.contributions)) {
              data.contributions.forEach((contribution) => {
                if (contribution.date) {
                  const dateKey = contribution.date;
                  const count = contribution.count || 0;
                  contributionMap[dateKey] = count;
                }
              });
            } else if (data.data && Array.isArray(data.data)) {
              // Alternative format
              data.data.forEach((contribution) => {
                if (contribution.date) {
                  contributionMap[contribution.date] = contribution.count || 0;
                }
              });
            }
          } else {
            console.warn(
              "Contributions API returned:",
              contributionsResponse.status
            );
          }
        } catch (error) {
          console.error("Error fetching from contributions API:", error);
        }

        // If still no data, try alternative service
        if (Object.keys(contributionMap).length === 0) {
          try {
            const altResponse = await fetch(
              `https://api.github-contributions.vercel.app/api?username=${username}`
            );

            if (altResponse.ok) {
              const altData = await altResponse.json();
              console.log("Alternative API response:", altData);
              if (altData.contributions) {
                altData.contributions.forEach((contribution) => {
                  if (contribution.date) {
                    contributionMap[contribution.date] =
                      contribution.count || 0;
                  }
                });
              }
            }
          } catch (altError) {
            console.error("Error with alternative API:", altError);
          }
        }

        console.log(
          "Final contribution map:",
          contributionMap,
          "Total dates:",
          Object.keys(contributionMap).length
        );

        // Generate data for last 5 months, each with 4 weeks
        const allWeeks = [];
        const monthLabels = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get last 5 months
        for (let monthOffset = 4; monthOffset >= 0; monthOffset--) {
          const monthStart = new Date(
            today.getFullYear(),
            today.getMonth() - monthOffset,
            1
          );
          const monthName = monthStart.toLocaleDateString("en-US", {
            month: "short",
          });
          const monthEnd = new Date(
            today.getFullYear(),
            today.getMonth() - monthOffset + 1,
            0
          );

          // Get the first Sunday of the month (or before if month doesn't start on Sunday)
          const firstDay = new Date(monthStart);
          const startDayOfWeek = firstDay.getDay(); // 0 = Sunday
          const firstSunday = new Date(firstDay);
          firstSunday.setDate(firstDay.getDate() - startDayOfWeek);

          // Generate 4 weeks for this month
          const monthWeeks = [];
          for (let week = 0; week < 4; week++) {
            const weekStart = new Date(firstSunday);
            weekStart.setDate(firstSunday.getDate() + week * 7);

            const weekDays = [];
            for (let day = 0; day < 7; day++) {
              const date = new Date(weekStart);
              date.setDate(weekStart.getDate() + day);

              // Only include days that are in this month
              if (date >= monthStart && date <= monthEnd) {
                const dateKey = date.toISOString().split("T")[0];
                const count = contributionMap[dateKey] || 0;
                weekDays.push({ date, count });
              } else {
                weekDays.push({ date: null, count: 0 });
              }
            }

            monthWeeks.push(weekDays);
            allWeeks.push(...weekDays);
          }

          // Store month label with its starting week index
          monthLabels.push({
            name: monthName,
            startWeek: allWeeks.length - 16, // 4 weeks * 7 days = 28, but we're adding 4 weeks
          });
        }

        // Reorganize: group weeks by month (4 weeks per month)
        const months = [];
        for (let i = 0; i < 5; i++) {
          const startIdx = i * 28; // 4 weeks * 7 days
          const monthWeeks = [];
          for (let week = 0; week < 4; week++) {
            const weekStart = startIdx + week * 7;
            monthWeeks.push(allWeeks.slice(weekStart, weekStart + 7));
          }
          months.push({
            name: monthLabels[i].name,
            weeks: monthWeeks,
          });
        }

        setContributions(months);
      } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
        generateEmptyContributions();
      } finally {
        setLoading(false);
      }
    };

    const generateEmptyContributions = () => {
      const months = [];
      const today = new Date();

      for (let monthOffset = 4; monthOffset >= 0; monthOffset--) {
        const monthStart = new Date(
          today.getFullYear(),
          today.getMonth() - monthOffset,
          1
        );
        const monthName = monthStart.toLocaleDateString("en-US", {
          month: "short",
        });
        const monthEnd = new Date(
          today.getFullYear(),
          today.getMonth() - monthOffset + 1,
          0
        );

        const firstDay = new Date(monthStart);
        const startDayOfWeek = firstDay.getDay();
        const firstSunday = new Date(firstDay);
        firstSunday.setDate(firstDay.getDate() - startDayOfWeek);

        const monthWeeks = [];
        for (let week = 0; week < 4; week++) {
          const weekStart = new Date(firstSunday);
          weekStart.setDate(firstSunday.getDate() + week * 7);

          const weekDays = [];
          for (let day = 0; day < 7; day++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + day);

            if (date >= monthStart && date <= monthEnd) {
              weekDays.push({ date, count: 0 });
            } else {
              weekDays.push({ date: null, count: 0 });
            }
          }

          monthWeeks.push(weekDays);
        }

        months.push({ name: monthName, weeks: monthWeeks });
      }

      setContributions(months);
    };

    if (username) {
      fetchContributions();
    } else {
      generateEmptyContributions();
    }
  }, [username]);

  const getIntensity = (count) => {
    if (count === 0) return "bg-slate-100 border-slate-200";
    if (count === 1) return "bg-green-400 border-green-400";
    if (count <= 3) return "bg-green-500 border-green-500";
    if (count <= 5) return "bg-green-600 border-green-600";
    return "bg-green-700 border-green-700";
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="text-[9px] text-slate-500 flex-1 text-center"
            >
              ...
            </span>
          ))}
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              {Array.from({ length: 7 }).map((_, j) => (
                <div
                  key={j}
                  className="w-2 h-2 rounded-sm bg-slate-100 border border-slate-200 animate-pulse"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!contributions) return null;

  return (
    <div className="space-y-2">
      {/* Month labels - each month spans 4 weeks */}
      <div className="flex items-center justify-between gap-0.5">
        {contributions.map((month, idx) => (
          <span
            key={idx}
            className="text-[9px] text-slate-500 whitespace-nowrap flex-1 text-center"
            style={{ flex: "0 0 20%" }}
          >
            {month.name}
          </span>
        ))}
      </div>

      {/* Contribution grid - 7 rows (days of week) x 20 columns (5 months × 4 weeks) */}
      <div className="flex gap-0.5">
        {contributions.map((month, monthIndex) =>
          month.weeks.map((week, weekIndex) => (
            <div
              key={`${monthIndex}-${weekIndex}`}
              className="flex flex-col gap-0.5"
            >
              {week.map((day, dayIndex) => (
                <div
                  key={`${monthIndex}-${weekIndex}-${dayIndex}`}
                  className={`w-3 h-3 rounded-sm border ${
                    day.date
                      ? getIntensity(day.count)
                      : "bg-transparent border-transparent"
                  }`}
                  title={
                    day.date
                      ? `${day.date.toLocaleDateString()}: ${
                          day.count
                        } contribution${day.count !== 1 ? "s" : ""}`
                      : ""
                  }
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GitHubContributions;
