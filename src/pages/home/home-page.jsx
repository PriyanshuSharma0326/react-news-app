import React from 'react';
import './home-page.style.scss';
import { useSelector } from 'react-redux';
import NewsBox from '../../components/news-box/news-box.component';

function HomePage() {
    const news = useSelector((state) => state.news.news);

    return (
        <div className='home-page-container'>
            <div className="top-news-container">
                <h1 className='title'>Top News</h1>
                {news.map((item, index) => {
                    return (
                        <NewsBox 
                            key={index} 
                            item={item} 
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default HomePage;
