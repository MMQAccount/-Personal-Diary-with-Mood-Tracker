import type { ReactCalendarHeatmapValue } from "react-calendar-heatmap";
import { moodMap } from "../constants/moodMap";

interface IMoodEntry {
    date: string | Date;
    mood: keyof typeof moodMap;
}

interface IProps {
    entries: IMoodEntry[];
    year: number;
}

const useYearPixels = ({ entries, year }: IProps) => {
    const values: ReactCalendarHeatmapValue<string>[] = entries
        .filter(({ date }) => new Date(date).getFullYear() === year)
        .map(({ date, mood }) => ({
            date:
                typeof date === "string"
                    ? date
                    : date.toISOString().slice(0, 10), // YYYY-MM-DD
            count: mood,
        }));

    const EMPTY_COLOR = "#e5e7eb";
    const colors: string[] = ["#a3c8f4", "#d2e596", "#fee6a6", "#f5ccb3", "#d3c1f7"];

    const moods = Object.entries(moodMap).map(([key, value], index) => [
        key,
        {...value,color: colors[index % colors.length],  },
    ]);

    return {
        EMPTY_COLOR,
        moods,   
        values,
    };
};

export default useYearPixels;
