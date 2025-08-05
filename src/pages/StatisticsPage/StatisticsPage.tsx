import { useState } from "react";
import classes from "./StatisticsPage.module.css";
import { startOfISOWeek, addDays } from "../../utils/dateHelpers";
import useMoodData, { type IMoodEntry } from "../../hooks/moodData.hook";
import StaticsHeader from "../../components/StaticsHeader/StaticsHeader";
import MoodPieChart from "../../components/MoodPieChart/MoodPieChart";
import MoodLineChart from "../../components/MoodLineChart/MoodLineChart";
import YearPixelChart from "../../components/YearPixelChart/YearPixelChart";
import { useUserData } from "../../providers/user-provider";
import { useMoods } from "../../providers/mood-provider";
import { ToastContainer } from "react-toastify";

const typeColorMap: Record<string, { color: string }> = {
  friends: { color: "#a3c8f4" },
  family: { color: "#d2e596" },
  work: { color: "#fee6a6" },
  health: { color: "#f5ccb3" },
  none: { color: "#d3c1f7" },
};

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

const MOOD_NAME: Record<number, string> = {
  0: "miserable",
  1: "sad",
  2: "neutral",
  3: "happy",
  4: "delighted",
};

const StatisticsPage = () => {

  const { user } = useUserData();
  const entries: IMoodEntry[] = user?.diaries?.map(({ date, mood, tags }) => ({
    date,
    mood: mood !== undefined ? MOOD_NAME[mood] : "neutral",
    tags: tags as IDiaryTagContent[] ?? [],
  })) ?? [];

  let { moods } = useMoods();
  moods = moods.map(m => ({
    ...m,
    emoji: user?.customMoodEmojis[m.name as keyof typeof user.customMoodEmojis] || m.emoji
  }));

  const now = new Date();

  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [viewMode, setViewMode] = useState<"weekly" | "monthly" | "yearly">("monthly");
  const [weekStart, setWeekStart] = useState(getClosestMonday(now));

  const { lineData, pieData, goodBadCounts, xKey, tagsData, typeCounts, entriesCount, daysWithTagsCount } = useMoodData(entries, viewMode, {
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

      {viewMode === "yearly" && entriesCount > 0 && (
        <div className={classes.chartContainer}>
          <YearPixelChart entries={entries} year={selectedYear} />
        </div>
      )}

      <div className={classes.chartContainer}>
        <h2 className={classes.chartLabel}>
          Your mood over the {viewMode === "yearly" ? "year" : viewMode === "monthly" ? "month" : "week"}
        </h2>

        {
          entriesCount > 0 ? (
            <div>
              <MoodLineChart data={lineData} xKey={xKey} moods={moods} />

              <div className={classes.sideBySideCharts}>
                <div className={classes.pieChartWrapper}>
                  <h4 className={classes.chartLabel}>Mood distribution</h4>
                  <MoodPieChart
                    pieData={pieData}
                    counts={goodBadCounts}
                    colorMap={typeColorMap}
                    moods={moods}
                  />
                </div>


                <div className={classes.pieChartWrapper}>
                  <h4 className={classes.chartLabel}>Sources that influenced your mood</h4>
                  {daysWithTagsCount > 0 ? (
                    <MoodPieChart
                      pieData={tagsData}
                      counts={typeCounts}
                      colorMap={typeColorMap}
                    />) :
                    <p className={`${classes.noDataMessage} ${classes.centerMessage}`}>
                      No tags found
                    </p>}
                </div>

              </div>
            </div>
          ) : (
            <p className={classes.noDataMessage}>
              No mood data found for the selected {viewMode === "yearly" ? "year" : viewMode === "monthly" ? "month" : "week"}
            </p>
          )
        }
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default StatisticsPage;
