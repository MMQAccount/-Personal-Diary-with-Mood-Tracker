import { formatRange } from "../../utils/dateHelpers";
import classes from "./StaticsHeader.module.css";

// Should be brought from DB
const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface IProps {
  viewMode: "weekly" | "monthly" | "yearly";
  setViewMode: (mode: "weekly" | "monthly" | "yearly") => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  weekStart: Date;
  setWeekStart: (date: Date) => void;
  startOfISOWeek: (date: Date) => Date;
  addDays: (date: Date, amount: number) => Date;
}

const StaticsHeader = (props: IProps) => {
  const {
    viewMode,
    setViewMode,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    weekStart,
    setWeekStart,
    addDays,
  } = props;

  const prevWeek = () => setWeekStart(addDays(weekStart, -7));
  const nextWeek = () => setWeekStart(addDays(weekStart, 7));

  const color = "#719b76";

  return (
    <div className={classes.header}>
      <h2 className={classes.title} style={{ color }}>
        Mood Statistics
      </h2>

      <div className={classes.controls}>
        <label>
          View:
          <select
            value={viewMode}
            onChange={(e) =>
              setViewMode(e.target.value as "weekly" | "monthly" | "yearly")
            }
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>

        {viewMode === "monthly" && (
          <label>
            Month:
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(+e.target.value)}
            >
              {months.map((m, i) => (
                <option key={m} value={i}>
                  {m}
                </option>
              ))}
            </select>
          </label>
        )}

        {(viewMode === "monthly" || viewMode === "yearly") && (
          <label>
            Year:
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(+e.target.value)}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {viewMode === "weekly" && (
        <div className={classes.weekNav}>
          <button className={classes.arrow} onClick={prevWeek} style={{ color }}>
            ←
          </button>
          <span className={classes.range}>{formatRange(weekStart)}</span>
          <button className={classes.arrow} onClick={nextWeek} style={{ color }}>
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default StaticsHeader;