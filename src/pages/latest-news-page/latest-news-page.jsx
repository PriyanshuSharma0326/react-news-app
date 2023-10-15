import React from 'react';
import './latest-news-page.style.scss';
import { useSelector } from 'react-redux';
import NewsBox from '../../components/news-box/news-box.component';

function LatestNews() {
    const latestNews = useSelector((state) => state.latestNews.news);

    return (
        <div className='latest-news-page-container'>
            <div className="latest-news-container">
                <h1 className='title'>Latest News</h1>
                {latestNews
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

export default LatestNews;
