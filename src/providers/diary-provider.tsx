import React, { createContext, type ReactNode, useState, useEffect } from "react";
import { createDiary, fetchDiariesForUser, updateDiaryContent } from "../services/diaryService";

interface IDiaryContext {
  diary: Store.IDayDiary[];
  addToDiary: (item: Store.IDayDiaryInput) => void;
  updateDiary: (id: string, item: Store.IDayDiary) => void;
}

export const DiaryContext = createContext<IDiaryContext>({
  diary: [],
  addToDiary: () => {},
  updateDiary: () => {},
});

const convertInputToBE = (item: Store.IDayDiaryInput): Store.IDayDiaryBECreateUpdate => {
  return {
    date: new Date(item.id).toISOString(),
    title: item.title,
    notes: item.notes,
    images: item.images,
    audios: item.voices,
    mood: item.state,
    tags: item.type,
  };
};

const diaryProvider = ({ children }: { children: ReactNode }) => {
  const [diary, setDiary] = useState<Store.IDayDiary[]>([]);

  useEffect(() => {
    const loadDiaries = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.warn("User ID not found");
        return;
      }
      try {
        const diariesFromDb = await fetchDiariesForUser(userId);
        const transformedDiaries: Store.IDayDiary[] = diariesFromDb.map(diary => ({
          _id: diary._id,
          id: diary.date ? new Date(diary.date).getTime() : Date.now(),
          title: diary.title || "",
          notes: diary.notes || [],
          images: diary.images || [],
          voices: diary.audios || [],
          state: diary.mood ?? 0,
          type: diary.tags?.map((tag: any) => String(tag)) || [],
        }));

        setDiary(transformedDiaries);
      } catch (error) {
        console.error("Failed to load diaries", error);
      }
    };
    loadDiaries();
  }, []);

  const addToDiary = async (item: Store.IDayDiaryInput) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) throw new Error("User not authenticated");

      const dataToSend = convertInputToBE(item);

      const response = await createDiary(userId, dataToSend, token);
      const savedDiaryBE: Store.IDayDiaryBE = response.data;

      const savedDiary: Store.IDayDiary = {
        _id: savedDiaryBE._id,
        id: savedDiaryBE.date ? new Date(savedDiaryBE.date).getTime() : Date.now(),
        title: savedDiaryBE.title || "",
        notes: savedDiaryBE.notes || [],
        images: savedDiaryBE.images || [],
        voices: savedDiaryBE.audios || [],
        state: savedDiaryBE.mood ?? 0,
        type: savedDiaryBE.tags?.map(tag => tag.toString()) || [],
      };

      setDiary(prev => [...prev, savedDiary]);
    } catch (error) {
      console.error("Error adding diary:", error);
    }
  };

const updateDiary = async (_id: string, item: Store.IDayDiary) => {
  try {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) throw new Error("User not authenticated");

    const dataToSend = convertInputToBE({
      id: item.id,
      title: item.title,
      notes: item.notes,
      images: item.images,
      voices: item.voices,
      state: item.state,
      type: item.type,
    });

    await updateDiaryContent(_id, userId, dataToSend, token);

    setDiary(prev => prev.map(d => (d._id === _id ? { ...d, ...item } : d)));
  } catch (error) {
    console.error("Error updating diary:", error);
  }
};


  return (
    <DiaryContext.Provider value={{ diary, addToDiary, updateDiary }}>
      {children}
    </DiaryContext.Provider>
  );
};

export default diaryProvider;
