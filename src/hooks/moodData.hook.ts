import { useMemo } from "react";
import {
  addDays,
  getMonthData,
  getWeekDaysData,
  getYearData,
} from "../utils/dateHelpers";
import { moodMap } from "../constants/moodMap";

export interface IMoodEntry {
  date: string | Date;
  mood: string;
  tags: IDiaryTagContent[];
}

interface IProps {
  selectedYear: number;
  selectedMonth: number;
  weekStart: Date;
}

const useMoodData = (
  entries: IMoodEntry[],
  viewMode: "weekly" | "monthly" | "yearly",
  moodData: IProps
) => {
  const { selectedYear, selectedMonth, weekStart } = moodData;

  const lineData = useMemo(() => {
    const normalized = entries.map((e) => ({
      ...e,
      date:
        typeof e.date === "string" ? e.date : e.date.toISOString().slice(0, 10),
    }));

    switch (viewMode) {
      case "weekly":
        return getWeekDaysData(normalized, weekStart, moodMap);
      case "yearly":
        return getYearData(normalized, selectedYear, moodMap);
      default:
        return getMonthData(normalized, selectedYear, selectedMonth, moodMap);
    }
  }, [entries, viewMode, weekStart, selectedYear, selectedMonth]);

  const xKey =
    viewMode === "monthly"
      ? "day"
      : viewMode === "weekly"
        ? "dayLabel"
        : "monthLabel";

  const entriesInRange = useMemo(() => {
    return entries.filter(({ date }) => {
      const d = new Date(date);
      if (viewMode === "weekly") {
        return (
          d.getTime() >= addDays(weekStart, -1).getTime() &&
          d.getTime() <= addDays(weekStart, 6).getTime()
        );
      }

      if (viewMode === "monthly") {
        return (
          d.getFullYear() === selectedYear &&
          d.getMonth() === selectedMonth
        );
      }
      return d.getFullYear() === selectedYear;
    });
  }, [entries, viewMode, weekStart, selectedYear, selectedMonth]);

  type MoodKey = "delighted" | "happy" | "neutral" | "sad" | "miserable";

  const pieData = useMemo(() => {
    const counts: Record<MoodKey, number> = {
      delighted: 0,
      happy: 0,
      neutral: 0,
      sad: 0,
      miserable: 0,
    };

    entriesInRange.forEach(({ mood }) => {
      if (mood in counts) counts[mood as MoodKey]++;
    });

    const total = entriesInRange.length || 1;
    return Object.entries(counts)
      .filter(([, v]) => v)
      .map(([name, v]) => ({
        name,
        value: Number(((v / total) * 100).toFixed(1)),
      }));
  }, [entriesInRange]);

  const tagsData = useMemo(() => {
    const counts: Record<string, number> = {};
    entriesInRange.forEach(({ tags }) => {
      tags.forEach((tag) => {
        counts[tag.name] = (counts[tag.name] || 0) + 1;
      });
    });

    const totalTags = Object.values(counts).reduce((sum, c) => sum + c, 0) || 1;
    return Object.entries(counts)
      .filter(([, v]) => v)
      .map(([name, count]) => ({
        name,
        value: Number(((count / totalTags) * 100).toFixed(1)),
      }));
  }, [entriesInRange]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    entriesInRange.forEach(({ tags }) => {
      tags.forEach((tag) => {
        counts[tag.name] = (counts[tag.name] || 0) + 1;
      });
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const [first = ["", 0], second = ["", 0]] = sorted;

    return {
      counts1: first[1],
      counts2: second[1],
      counts1Label: first[0],
      counts2Label: second[0],
    };
  }, [entriesInRange]);

  const goodBadCounts = useMemo(() => {
    let good = 0,
      bad = 0;
    entriesInRange.forEach(({ mood }) => {
      if (mood === "delighted" || mood === "happy") good++;
      if (mood === "sad" || mood === "miserable") bad++;
    });
    return {
      counts1: good,
      counts2: bad,
      counts1Label: "Good",
      counts2Label: "Bad",
    };
  }, [entriesInRange]);

  return {
    lineData,
    pieData,
    typeCounts,
    goodBadCounts,
    xKey,
    tagsData,
  };
};

export default useMoodData;
