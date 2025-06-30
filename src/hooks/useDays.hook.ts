import { useContext, useState } from "react";
import { DiaryContext } from "../providers/diary-provider";

const useDays = () => {

    const { diary } = useContext(DiaryContext);

    const getUniqueDiaryDayIds = (diary: Store.IDiaryItem[]): number[] => {
        const uniqueDaysMap = new Map<string, number>();
        diary.forEach(item => {
            const dayKey = new Date(item.id).toISOString().split("T")[0];
            if (!uniqueDaysMap.has(dayKey)) {
                uniqueDaysMap.set(dayKey, item.id);
            }
        });
        const elements = Array.from(uniqueDaysMap.values());
        const sorted = [...elements].sort((a, b) => b - a);
        return sorted;
    };

    const DiaryDays = getUniqueDiaryDayIds(diary);

    return {
        DiaryDays
    }
}
export default useDays;