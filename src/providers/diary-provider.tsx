import { createContext, type ReactNode, useState } from "react";

interface IDiaryContext {
  diary: Store.IDayDiary[];
  addToDiary: (item: Store.IDayDiary) => void;
  updateDiary: (id: number, item: Store.IDayDiary) => void;
}

const initialDiary: Store.IDayDiary[] = [
  {
    id: new Date("2025-06-27").getTime(),
    title: "Family Reunion",
    type: ["Family"],
    state: 4,
    notes: [
      "We had a big *family reunion* at grandma's house. It was:",
      "1. Warm and loving",
      "2. A bit chaotic",
      "3. Full of laughter",
      "I helped Grandma bake pies—**apple** and **cherry**—and it felt like *home* again."
    ],
    voices: [],
  },
  {
    id: new Date("2025-06-28").getTime(),
    title: "",
    type: ["Family", "School"],
    state: 3,
    notes: [],
    voices: [],
    images: [
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
    ],
  },
  {
    id: new Date("2025-05-29").getTime(),
    title: "Quiet Victory",
    type: ["Work"],
    state: 4,
    notes: [
      "Finally finished that stubborn article I've been working on. The words just *flowed* today.",
      "Result:",
      "- **2,500** words written",
      "- Dozens of edits",
      "Feeling proud and relieved!"
    ],
    voices: [],
  },
  {
    id: new Date("2025-05-30").getTime(),
    title: "Midterms Stress",
    type: ["School"],
    state: 2,
    notes: [
      "Studying for my midterms is **exhausting**. Notes are everywhere:",
      "- Biology chapter 5",
      "- Math integration problems",
      "- Literature analysis 🤯",
      "I scheduled breaks and made a *color-coded* timetable.",
      "**Goal:** finish all review by Friday."
    ],
    voices: [],
  },
  {
    id: new Date("2025-06-01").getTime(),
    title: "Evening Walk",
    type: ["School"],
    state: 1,
    notes: [
      "Took a long walk as the sun set. The park was calm, birds chirping. I felt a sense of peace:",
      "> _Walking clears the mind._",
      "Returned with a fresh perspective and motivation to journal."
    ],
    voices: [],
  },
  {
    id: new Date("2025-06-02").getTime(),
    title: "Friendsgiving Prep",
    type: ["Friends"],
    state: 3,
    notes: [
      "Planning a **Friendsgiving** dinner:",
      "- 🥧 Pumpkin pie",
      "- 🍗 Roast chicken",
      "- 🥗 Green salad",
      "- 🎶 Playlist is ready",
      "Created an invite in the group chat and assigned tasks. So excited!"
    ],
    voices: [],
    images: [
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
    ],
  },
  {
    id: new Date("2025-06-03").getTime(),
    title: "On Top of the World",
    type: ["Family"],
    state: 4,
    notes: [
      "Everything clicked today — energy, creativity, and happiness!"
    ],
    voices: [],
    images: [
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
    ],
  }
];


export const DiaryContext = createContext<IDiaryContext>({ diary: [], addToDiary: () => { }, updateDiary: () => { } });

const diaryProvider = ({ children }: { children: ReactNode }) => {
  const [diary, setDiary] = useState<Store.IDayDiary[]>(initialDiary);

  const addToDiary = (item: Store.IDayDiary) => {
    setDiary((prev) => [...prev, item]);
  }
  const updateDiary = (id: number, item: Store.IDayDiary) => {
  setDiary((prev) =>
    prev.map((d) => (d.id === id ? { ...d, ...item } : d))
  );
};

  return <DiaryContext.Provider value={{ diary, addToDiary, updateDiary }}>{children}</DiaryContext.Provider>
}

export default diaryProvider;