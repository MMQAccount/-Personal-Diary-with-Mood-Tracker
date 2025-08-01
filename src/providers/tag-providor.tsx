import { createContext, type ReactNode, useState, useEffect } from "react";
import { useUserData } from "./user-provider";
import { fetchTagsForUser, updateTag } from "../services/tag.service";

interface ITagsContext {
  tags: ITag[];
  updateTags: (id: string, name: string) => void;
}

export const TagsContext = createContext<ITagsContext>({
  tags: [],
  updateTags: () => { },
});

const TagProvider = ({ children }: { children: ReactNode }) => {
  const { user, refreshUser } = useUserData();
  const [allTags, setAllTags] = useState<ITag[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    const loadTags = async () => {
      const userId = localStorage.getItem('userId');
      if (!user) return;
      try {
        const fetchedTags = await fetchTagsForUser(userId ?? '');
        setAllTags(fetchedTags);
      } catch (error) {
        console.error("Failed to fetch all tags", error);
      }
    };
    loadTags();
  }, [user]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!user) return;

    const filtered = allTags.filter(tag =>
      tag.type === "global" || (tag.type === "custom" && tag.user === userId)
    );
    setTags(filtered);
  }, [allTags, user]);


  const updateTags = async (id: string, name: string): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await updateTag(id, { name }, token);

      setAllTags((prevTags) =>
        prevTags.map((tag) =>
          tag._id === id ? { ...tag, name } : tag
        )
      );
    } catch (error) {
      console.error("Failed to update tag in DB", error);
    }
  };

  return (
    <TagsContext.Provider value={{ tags, updateTags }}>
      {children}
    </TagsContext.Provider>
  );
};

export default TagProvider;
