import { useState } from "react";
import classes from "./StatisticsPage.module.css";
import { startOfISOWeek, addDays } from "../../utils/dateHelpers";
import useMoodData from "../../hooks/moodData.hook";
import StaticsHeader from "../../components/StaticsHeader/StaticsHeader";
import MoodPieChart from "../../components/MoodPieChart/MoodPieChart";
import MoodLineChart from "../../components/MoodLineChart/MoodLineChart";
import YearPixelChart from "../../components/YearPixelChart/YearPixelChart";

const sampleEntries = [
  // — Current‑week block (Mon‑Sun)
  { date: "2025-06-9", mood: "sad", type: "family" },
  { date: "2025-06-10", mood: "happy", type: "family" },
  { date: "2025-06-11", mood: "neutral", type: "work" },
  { date: "2025-06-12", mood: "sad", type: "health" },
  { date: "2025-06-13", mood: "delighted", type: "friends" },
  { date: "2025-06-14", mood: "miserable", type: "work" },
  { date: "2025-06-15", mood: "happy", type: "friends" },
  { date: "2025-06-16", mood: "neutral", type: "family" },

  // — Another week (8‑14 July)
  { date: "2025-07-08", mood: "neutral", type: "work" },
  { date: "2025-07-09", mood: "happy", type: "friends" },
  { date: "2025-07-10", mood: "sad", type: "health" },
  { date: "2025-07-12", mood: "delighted", type: "family" },
  { date: "2025-07-14", mood: "happy", type: "friends" },

  // — Two per month (2025)
  { date: "2025-01-05", mood: "delighted", type: "friends" },
  { date: "2025-01-20", mood: "neutral", type: "work" },
  { date: "2025-02-05", mood: "sad", type: "health" },
  { date: "2025-02-18", mood: "happy", type: "family" },
  { date: "2025-03-03", mood: "happy", type: "friends" },
  { date: "2025-03-19", mood: "neutral", type: "work" },
  { date: "2025-04-06", mood: "miserable", type: "health" },
  { date: "2025-04-21", mood: "happy", type: "friends" },
  { date: "2025-05-04", mood: "neutral", type: "work" },
  { date: "2025-05-18", mood: "delighted", type: "family" },
  { date: "2025-06-22", mood: "happy", type: "friends" },
  { date: "2025-07-03", mood: "sad", type: "health" },
  { date: "2025-07-18", mood: "neutral", type: "work" },
  { date: "2025-08-07", mood: "delighted", type: "friends" },
  { date: "2025-08-22", mood: "miserable", type: "work" },
  { date: "2025-09-05", mood: "happy", type: "family" },
  { date: "2025-09-22", mood: "neutral", type: "friends" },
  { date: "2025-10-07", mood: "sad", type: "health" },
  { date: "2025-10-20", mood: "delighted", type: "family" },
  { date: "2025-11-04", mood: "neutral", type: "work" },
  { date: "2025-11-19", mood: "happy", type: "friends" },
  { date: "2025-12-01", mood: "miserable", type: "health" },
  { date: "2025-12-15", mood: "delighted", type: "friends" },

  // — A couple from 2023
  { date: "2023-06-12", mood: "happy", type: "friends" },
  { date: "2023-12-25", mood: "neutral", type: "family" },
];

const typeColorMap: Record<string, { color: string }> = {
  friends: { color: "#a3c8f4" },
  family: { color: "#d2e596" },
  work: { color: "#fee6a6" },
  health: { color: "#f5ccb3" },
  none: { color: "#d3c1f7" },
};

interface StatisticsPageProps {
  entries?: typeof sampleEntries;
}

function getClosestMonday(date: Date): Date {
  const day = date.getDay();
  const diffToMonday = (day + 6) % 7;
  const prevMonday = new Date(date);
  prevMonday.setDate(date.getDate() - diffToMonday);

  const nextMonday = new Date(prevMonday);
  nextMonday.setDate(prevMonday.getDate() + 7);

  const msToPrev = Math.abs(date.getTime() - prevMonday.getTime());
  const msToNext = Math.abs(nextMonday.getTime() - date.getTime());

  return msToPrev <= msToNext ? prevMonday : nextMonday;
}

const StatisticsPage = ({ entries = sampleEntries }: StatisticsPageProps) => {
  const now = new Date();

  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [viewMode, setViewMode] = useState<"weekly" | "monthly" | "yearly">("monthly");
  const [weekStart, setWeekStart] = useState(getClosestMonday(now));

  const { lineData, pieData, goodBadCounts, xKey, typeData, typeCounts } = useMoodData(entries, viewMode, {
    selectedYear,
    selectedMonth,
    weekStart,
  });

  return (
    <div className={classes.fullWidthPage}>
      <h2 className={classes.title}>Statistics</h2>

      <StaticsHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        weekStart={weekStart}
        setWeekStart={setWeekStart}
        startOfISOWeek={startOfISOWeek}
        addDays={addDays}
      />

      {viewMode === "yearly" && (
        <div className={classes.chartContainer}>
          <YearPixelChart entries={entries} year={selectedYear} />
        </div>
      )}

      <div className={classes.chartContainer}>
        <h2 className={classes.chartLabel} style={{ marginTop: "7px" }} >Your mood over the {viewMode === "yearly" ? "year" : viewMode === "monthly" ? "month" : "week"}</h2>
        <MoodLineChart data={lineData} xKey={xKey} />
      </div>

      <div className={classes.sideBySideCharts}>
        <div className={classes.pieChartWrapper}>
          <h4 className={classes.chartLabel}>Mood distribution</h4>
          <MoodPieChart
            pieData={pieData}
            counts={goodBadCounts}
            colorMap={typeColorMap}
          />
        </div>

        <div className={classes.pieChartWrapper}>
          <h4 className={classes.chartLabel}>Sources that influenced your mood</h4>
          <MoodPieChart
            pieData={typeData}
            counts={typeCounts}
            colorMap={typeColorMap}
          />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
