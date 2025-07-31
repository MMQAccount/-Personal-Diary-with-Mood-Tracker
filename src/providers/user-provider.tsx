import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserById } from "../services/user.service";
import { toast } from "react-toastify";
import { fetchDiariesForUser } from "../services/diary.service";

  export interface IUser {
    name: string;
    email: string;
    imageURL?: string;
    customMoodEmojis: {
      delighted: string;
      happy: string;
      neutral: string;
      sad: string;
      miserable: string;
    };
    diaries: IDiary[];
  }

interface UserContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider2: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const refreshUser = async () => {
    
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) return;

      const data = await getUserById(userId, token);
      const user: IUser = data.data;

      const diaries = await fetchDiariesForUser(userId);

      setUser({
        name: data.data.name || "",
        email: data.data.email || "",
        imageURL:
          data.data.imageURL ||
          "https://api.dicebear.com/6.x/adventurer/svg?seed=girl",
        customMoodEmojis: {
          delighted: user.customMoodEmojis.delighted,
          happy: user.customMoodEmojis.happy,
          neutral: user.customMoodEmojis.neutral,
          sad: user.customMoodEmojis.sad,
          miserable: user.customMoodEmojis.miserable,
        },
        diaries: diaries,
      });
      
    } catch (error) {
      
      toast.error(`Failed to fetch user data: ${error}`, {
        toastId: "refreshUserError",
      });
    }
  };

  useEffect(() => {
    refreshUser();
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
