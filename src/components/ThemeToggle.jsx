import React, { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || "light";

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (!localStorage.getItem("theme")) {
        const newSystemTheme = mediaQuery.matches ? "dark" : "light";
        setTheme(newSystemTheme);
        document.documentElement.setAttribute("data-theme", newSystemTheme);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button className="btn btn-sm btn-ghost" onClick={toggleTheme}>
      {theme === "light" ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.607.748-3.752A9.753 9.753 0 009.75 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75v.002z"
            />
          </svg>
          Dark Mode
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.558 1.559M21 12h-2.25m-.386 6.364l-1.559-1.558M12 18.75V21m-4.364-.386l1.558-1.559M3 12h2.25m.386-6.364l1.559 1.558M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
            />
          </svg>
          Light Mode
        </>
      )}
    </button>
  );
}
