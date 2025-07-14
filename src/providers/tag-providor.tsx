import { createContext, type ReactNode, useState } from "react";

interface ITagsContext {
    tags: string[];
    //   addToDiary: (item: Store.IDayDiary) => void;
    updateTags: (index: number, value: string) => void;
}

const initinalTags = ["Family 👨‍👩‍👧‍👦", "Work 🏢", "School 🏫", "Friends 👥"];


export const TagsContext = createContext<ITagsContext>({ tags: [], updateTags: () => { } });

const TagProvider = ({ children }: { children: ReactNode }) => {
    const [tags, setTags] = useState<string[]>(initinalTags);

    //   const addToDiary = (item: Store.IDayDiary) => {
    //     setDiary((prev) => [...prev, item]);
    //   }
    const updateTags = (id: number, item: string) => {
        setTags((prev) =>
            prev.map((d, index) => (index === id ? item : d))
        );
    };

    return <TagsContext.Provider value={{ tags, updateTags }}>{children}</TagsContext.Provider>
}

export default TagProvider;