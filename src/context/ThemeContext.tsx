"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeType = "default" | "red" | "green" | "pink";

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const THEMES: Record<ThemeType, { name: string; gradient: string; primary: string }> = {
    default: {
        name: "Default Blue",
        gradient: "linear-gradient(135deg, #1F3A5F 0%, #274C77 100%)",
        primary: "#1F3A5F",
    },
    red: {
        name: "Premium Red",
        gradient: "linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)",
        primary: "#7F1D1D",
    },
    green: {
        name: "Emerald Green",
        gradient: "linear-gradient(135deg, #064E3B 0%, #065F46 100%)",
        primary: "#064E3B",
    },
    pink: {
        name: "Royal Pink",
        gradient: "linear-gradient(135deg, #701A75 0%, #86198F 100%)",
        primary: "#701A75",
    },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeType>("default");

    useEffect(() => {
        const savedTheme = localStorage.getItem("sewait-theme") as ThemeType;
        if (savedTheme && THEMES[savedTheme]) {
            setThemeState(savedTheme);
        }
    }, []);

    const setTheme = (newTheme: ThemeType) => {
        setThemeState(newTheme);
        localStorage.setItem("sewait-theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
