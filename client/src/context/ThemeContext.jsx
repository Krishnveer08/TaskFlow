import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const themes = {
  dark: {
    page: "bg-slate-900 text-white",
    card: "bg-slate-800",
    cardHover: "hover:bg-slate-700",
    input: "bg-slate-700 border-slate-600",
    text: "text-white",
    subText: "text-gray-400",
  },

  light: {
    page: "bg-gray-100 text-slate-900",
    card: "bg-white",
    cardHover: "hover:bg-gray-100",
    input: "bg-gray-50 border-gray-300",
    text: "text-slate-900",
    subText: "text-gray-600",
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors: themes[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);