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
};

const StaticsHeader = (props: IProps) => {
    const { viewMode, setViewMode, selectedYear, setSelectedYear, selectedMonth,
        setSelectedMonth, weekStart, setWeekStart, addDays } = props;

    const prevWeek = () => setWeekStart(addDays(weekStart, -7));
    const nextWeek = () => setWeekStart(addDays(weekStart, 7));

    return (
        <div className={classes.header}>
            <h2 className={classes.title}>Mood Statistics</h2>

            <div className={classes.controls}>
                <label>
                    View:
                    <select value={viewMode} onChange={e => setViewMode(e.target.value as "weekly" | "monthly" | "yearly")}>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </label>

                <label>
                    Month:
                    <select
                        disabled={viewMode !== "monthly"}
                        value={selectedMonth}
                        onChange={e => setSelectedMonth(+e.target.value)}
                    >
                        {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
                    </select>
                </label>

                <label>
                    Year:
                    <select value={selectedYear} onChange={e => setSelectedYear(+e.target.value)}>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </label>
            </div>

            {viewMode === "weekly" && (
                <div className={classes.weekNav}>
                    <button className={classes.arrow} onClick={prevWeek}>←</button>
                    <span className={classes.range}>{formatRange(weekStart)}</span>
                    <button className={classes.arrow} onClick={nextWeek}>→</button>
                </div>
            )}
        </div>
    );
}

export default StaticsHeader;