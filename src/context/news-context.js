import React, { createContext } from "react";

export const NewsContext = createContext();

export const NewsContextProvider = ({ children }) => {
    const contextValue = {};
    
    return (
        <NewsContextProvider value={ contextValue }>
            { children }
        </NewsContextProvider>
    )
}
