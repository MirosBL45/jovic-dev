'use client'

// react/next stuff
import { createContext, useEffect, useState } from "react"

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // initially undefined
    const [mode, setMode] = useState(undefined);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // check the theme in the localStorage
            const stored = localStorage.getItem('theme');
            if (stored) {
                setMode(stored);
            } else {
                // check prefers-color-scheme of system
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setMode(prefersDark ? 'dark' : 'light');
            }
        }
    }, []);

    useEffect(() => {
        if (mode) {
            // set the theme in the localStorage
            localStorage.setItem('theme', mode);
        }
    }, [mode]);

    function toggle() {
        setMode(prev => prev === 'dark' ? 'light' : 'dark');
    }

    // Until we know what the theme is, don't render anything
    if (!mode) return null;

    return (
        <ThemeContext.Provider value={{ toggle, mode }}>
            <div className={`light ${mode}`}>{children}</div>
        </ThemeContext.Provider>
    )
}