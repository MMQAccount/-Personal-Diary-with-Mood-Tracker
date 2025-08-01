import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserById } from "../services/user.service";
import { toast } from "react-toastify";
import { fetchDiariesForUser } from "../services/diary.service";
import { fetchTagsForUser } from "../services/tag.service";

interface IDataChanged {
  diariesChanged?: boolean;
  tagsChanged?: boolean;
  userChanged?: boolean;
}

interface UserContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  refreshUser: (changes: IDataChanged) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider2: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const refreshUser = async ({
    diariesChanged = false,
    tagsChanged = false,
    userChanged = false,
  }: Partial<IDataChanged> = {}) => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) return;

      // Use current user if no need to refetch
      let currentUser = user;
      if (userChanged) {
        const response = await getUserById(userId, token);
        currentUser = response.data;
      }

      if (!currentUser) return;

      const diaries = diariesChanged ? await fetchDiariesForUser(userId) : currentUser.diaries || [];

      const tags = tagsChanged ? await fetchTagsForUser(userId) : currentUser.tags || [];

      setUser({
        name: currentUser.name || "",
        email: currentUser.email || "",
        imageURL:
          currentUser.imageURL ||
          "https://api.dicebear.com/6.x/adventurer/svg?seed=girl",
        customMoodEmojis: {
          delighted: currentUser.customMoodEmojis?.delighted || "",
          happy: currentUser.customMoodEmojis?.happy || "",
          neutral: currentUser.customMoodEmojis?.neutral || "",
          sad: currentUser.customMoodEmojis?.sad || "",
          miserable: currentUser.customMoodEmojis?.miserable || "",
        },
        diaries,
        tags,
      });

    } catch (error) {
      toast.error(`Failed to fetch user data: ${error}`, {
        toastId: "refreshUserError",
      });
    }
  };

  useEffect(() => {
    refreshUser({
      diariesChanged: true,
      tagsChanged: true,
      userChanged: true,
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for convenience
export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
