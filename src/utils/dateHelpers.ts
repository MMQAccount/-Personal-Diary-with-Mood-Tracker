import type { IMood } from "../constants/moodMap";

const dayLabels: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthLabels: string[] = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const startOfISOWeek = (d: Date) => {
    const time = new Date(d);
    const day = time.getDay() || 7;

    time.setDate(time.getDate() - day + 1);
    time.setHours(0, 0, 0, 0);

    return time;
};

const addDays = (date: Date, n: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + n);

    return d;
};

const fmtDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

const formatRange = (start: Date) => {
    return `${fmtDate(start)} - ${fmtDate(addDays(start, 6))}`;
}

const getMonthData = (entries: Array<{ date: string; mood: string }>, year: number, month: number, map: Record<string, IMood>) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const byDay: Record<number, { day: number; score: number }> = {};

    entries.forEach(({ date, mood }) => {
        const d = new Date(date);
        if (d.getFullYear() === year && d.getMonth() === month) {
            byDay[d.getDate()] = { day: d.getDate(), score: map[mood]?.score ?? 0 };
        }
    });

    return Array.from({ length: daysInMonth }, (_, i) =>
        byDay[i + 1] ?? { day: i + 1, score: 0 }
    );
};

const getWeekDaysData = (entries: Array<{ date: string; mood: string }>, weekStart: Date, map: Record<string, IMood>) =>
    dayLabels.map((lbl, i) => {
        const day = addDays(weekStart, i);
        const iso = day.toISOString().slice(0, 10);
        // const sameDay = entries.filter(e => e.date === iso);
        const sameDay = entries.filter(e => {
            const entryDate = new Date(e.date).toISOString().slice(0, 10);
            return entryDate === iso;
        });


        const avg = sameDay.reduce((a, b) => a + (map[b.mood]?.score ?? 0), 0) / (sameDay.length || 1);

        return { dayLabel: lbl, score: Number(avg.toFixed(2)) };
    });

const getYearData = (entries: Array<{ date: string; mood: string }>, year: number, map: Record<string, IMood>) => {
    const months: number[][] = Array.from({ length: 12 }, () => []);

    entries.forEach(({ date, mood }) => {
        const d = new Date(date);
        if (d.getFullYear() === year) {
            months[d.getMonth()].push(map[mood]?.score ?? 0);
        }
    });

    return months.map((scores, i) => {
        if (!scores.length) return { monthLabel: monthLabels[i], score: 0 };
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        return { monthLabel: monthLabels[i], score: Number(avg.toFixed(2)) };
    });
};

export {
    dayLabels,
    monthLabels,
    startOfISOWeek,
    addDays,
    formatRange,
    getMonthData,
    getWeekDaysData,
    getYearData,
};
