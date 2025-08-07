import { createContext, useContext, useState } from "react";

export interface User {
  name: string;
  avatar: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
});


 const login = (userData: User) => {
  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));
};

 const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("user"); 
  setUser(null);
};


  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
};
