import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TopicBasedNews from '../../pages/topic-based-news/topic-based-news';
import LatestNews from '../../pages/latest-news-page/latest-news-page';

function NewsAndTopics() {
    return (
        <Routes>
            <Route 
                index 
                element={<LatestNews />} 
            />

            <Route 
                path=':topic' 
                element={<TopicBasedNews />} 
            />
        </Routes>
    )
}

export default NewsAndTopics;
