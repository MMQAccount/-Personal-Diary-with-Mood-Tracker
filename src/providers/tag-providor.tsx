import { createContext, type ReactNode, useState } from "react";

interface ITagsContext {
    tags: string[];
    updateTags: (index: number, value: string) => void;
}

const initinalTags = ["Family 👨‍👩‍👧‍👦", "Work 🏢", "School 🏫", "Friends 👥"];


export const TagsContext = createContext<ITagsContext>({ tags: [], updateTags: () => { } });

const TagProvider = ({ children }: { children: ReactNode }) => {
    const [tags, setTags] = useState<string[]>(initinalTags);

    const updateTags = (id: number, item: string) => {
        setTags((prev) =>
            prev.map((d, index) => (index === id ? item : d))
        );
    };

    return <TagsContext.Provider value={{ tags, updateTags }}>{children}</TagsContext.Provider>
}

export default TagProvider;