import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const colorOptions = [
  { name: "Default", light: "", dark: "" },
  { name: "Purple", light: "#9b59b6", dark: "#2c145a" },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const savedColor = localStorage.getItem("themeColor");

    if (savedTheme) setTheme(savedTheme);
    if (
      savedColor &&
      colorOptions.some(
        (c) => c.name.toLowerCase() === savedColor.toLowerCase()
      )
    ) {
      const properColor = colorOptions.find(
        (c) => c.name.toLowerCase() === savedColor.toLowerCase()
      )?.name;
      if (properColor)
        setSelectedColor(properColor === "Default" ? "" : properColor);
    } else {
      setSelectedColor("");
    }

    setIsLoaded(true);
  }, []);

  const getThemeName = (th: Theme, color: string) => {
    if (!color) {
      return th === "light" ? "light-default" : "dark-default";
    }
    switch (color) {
      case "Purple":
        return th === "light" ? "light-purple" : "dark-purple";
      default:
        return th === "light" ? "light-default" : "dark-default";
    }
  };

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("theme", theme);
    localStorage.setItem("themeColor", selectedColor);

    const themeName = getThemeName(theme, selectedColor);
    document.body.setAttribute("data-theme", themeName);
  }, [theme, selectedColor, isLoaded]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, selectedColor, setSelectedColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
