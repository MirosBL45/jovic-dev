'use client'

// react/next stuff
import { createContext, useState } from "react"

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    function toggle() {
        setMode(prev => prev === 'dark' ? 'light' : 'dark');
    }

    return (
        <ThemeContext.Provider value={{ toggle, mode }}>
            <div className={`light ${mode}`}>{children}</div>
        </ThemeContext.Provider>
    )
}