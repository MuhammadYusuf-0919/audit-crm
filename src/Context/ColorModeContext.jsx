import React, { createContext } from "react";

export const ColorModeContext = createContext();

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
        }),
        [],
    );
    const value = {
        mode,
        colorMode
    }
    return(
        <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>
    )
}