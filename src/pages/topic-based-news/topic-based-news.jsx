import React from 'react';
import './topic-based-news.style.scss';
import { useSelector } from 'react-redux';
import NewsBox from '../../components/news-box/news-box.component';
import { useLocation } from 'react-router-dom';

function TopicBasedNews() {
    const cateredNews = useSelector((state) => state.cateredNews.news);

    const location = useLocation();

    const newsContent = cateredNews[location.pathname.split('/news/')[1]];

    return (
        <div className='topic-based-news-container'>
            <div className="topic-news-container">
            <h1 className='title'>News On {location.pathname.split('/news/')[1]}</h1>
                {newsContent
                    .filter(item => item.urlToImage)
                    .map((item, index) => (
                        <NewsBox 
                            key={index} 
                            item={item} 
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default TopicBasedNews;
