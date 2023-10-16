import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TopicBasedNews from '../../pages/topic-based-news/topic-based-news';
import GeneralNews from '../../pages/latest-news-page/general-news-page';

function NewsAndTopics() {
    return (
        <Routes>
            <Route 
                index 
                element={<GeneralNews />} 
            />

            <Route 
                path=':topic' 
                element={<TopicBasedNews />} 
            />
        </Routes>
    )
}

export default NewsAndTopics;
