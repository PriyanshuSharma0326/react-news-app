import React from 'react';
import './general-news-page.style.scss';
import { useSelector } from 'react-redux';
import NewsBox from '../../components/news-box/news-box.component';

function GeneralNews() {
    const cateredNews = useSelector((state) => state.cateredNews.news);

    const newsContent = cateredNews['General'];

    return (
        <div className='general-news-page-container'>
            <div className="general-news-container">
                <h1 className='title'>General News</h1>
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

export default GeneralNews;
