import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const CompiledNewsContext = createContext();

export const CompiledNewsContextProvider = ({ children }) => {
    const [compiledNews, setCompiledNews] = useState([]);

    const news = useSelector((state) => state.news.news);
    const cateredNews = useSelector((state) => state.cateredNews.news);

    useEffect(() => {
        if(news && cateredNews) {
            const allNews = [...news, ...[].concat(...Object.values(cateredNews))];
            setCompiledNews(allNews);
        }
    }, [news, cateredNews])

    const contextValue = {
        compiledNews,
        setCompiledNews
    };

    return (
        <CompiledNewsContext.Provider value={ contextValue }>
            { children }
        </CompiledNewsContext.Provider>
    )
}
