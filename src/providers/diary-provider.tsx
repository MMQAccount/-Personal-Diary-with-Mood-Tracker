import { createContext, type ReactNode, useState } from "react";

interface IDiaryContext {
  diary: Store.IDiaryItem[];
  addToDiary: (item: Store.IDiaryItem) => void;
}
const initialDiary: Store.IDiaryItem[] = [
  {
    id: 6,
    title: "Deep Reflection",
    notes: "Today I spent hours reading old journal entries. \n\n- Realized how far I've come\n- Missed some friendships\n\n**Conclusion:** growth is slow, but it's happening.",
    state: 2,
    type: "Reflection",
    image: "https://example.com/images/reflection.jpg"
  },
  {
    id: 7,
    title: "Family Reunion",
    notes: "We had a big *family reunion* at grandma's house. It was:\n\n1. Warm and loving\n2. A bit chaotic\n3. Full of laughter\n\nI helped Grandma bake pies—**apple** and **cherry**—and it felt like *home* again.",
    state: 3,
    type: "Family",
    image: "https://example.com/images/reunion.jpg"
  },
  {
    id: 8,
    title: "Unexpected Challenge",
    notes: "Work threw me a curveball:\n\n> \"Can you lead the new project from scratch?\"\n\nI felt nervous 😬 but took the challenge. **First milestone**: outline drafted. Need to keep momentum now.",
    state: 1,
    type: "Work",
  },
  {
    id: 9,
    title: "Quiet Victory",
    notes: "Finally finished that stubborn article I've been working on. The words just *flowed* today.\n\nResult:\n\n- **2,500** words written\n- Dozens of edits\n\nFeeling proud and relieved!",
    state: 4,
    type: "Creativity",
    image: "https://example.com/images/writing.jpg"
  },
  {
    id: 10,
    title: "Midterms Stress",
    notes: "Studying for my midterms is **exhausting**. Notes are everywhere:\n- Biology chapter 5\n- Math integration problems\n- Literature analysis 🤯\n\nI scheduled breaks and made a *color-coded* timetable. \n\n**Goal:** finish all review by Friday.",
    state: 2,
    type: "School",
    image: "https://example.com/images/study.jpg"
  },
  {
    id: 11,
    title: "Evening Walk",
    notes: "Took a long walk as the sun set. The park was calm, birds chirping. I felt a sense of peace:\n\n> _Walking clears the mind._\n\nReturned with a fresh perspective and motivation to journal.",
    state: 3,
    type: "Self-care",
  },
  {
    id: 12,
    title: "Friendsgiving Prep",
    notes: "Planning a **Friendsgiving** dinner:\n\n- 🥧 Pumpkin pie\n- 🍗 Roast chicken\n- 🥗 Green salad\n- 🎶 Playlist is ready\n\nCreated an invite in the group chat and assigned tasks. So excited!",
    state: 4,
    type: "Friends",
    image: "https://example.com/images/friendsgiving.jpg"
  },
  {
    id: 5,
    title: "On Top of the World",
    notes: "Everything clicked today — energy, creativity, and happiness!",
    state: 4,
    type: "Family",
    image: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
  }
];

export const DiaryContext = createContext<IDiaryContext>({ diary: [], addToDiary: () => { } });

const diaryProvider = ({ children }: { children: ReactNode }) => {
  const [diary, setDiary] = useState<Store.IDiaryItem[]>(initialDiary);

  const addToDiary = (item: Store.IDiaryItem) => {
    setDiary((prev) => [...prev, item]);
  }

  return <DiaryContext.Provider value={{ diary, addToDiary }}>{children}</DiaryContext.Provider>
}

export default diaryProvider;