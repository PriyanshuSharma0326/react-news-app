import React from 'react';
import './news-box.style.scss';
import { formatDate } from '../../utils/util';

function NewsBox({ item }) {
    return (
        <div className='news-box'>
            <a href={item.url} target='_blank' rel='noreferrer'>
                <img src={item.urlToImage} alt="" />
            </a>
            <div className="news-content">
                <a href={item.url} target='_blank' rel='noreferrer'>
                    {item.title}
                </a>

                <h2>{item.description}</h2>
                <p>{item.content?.split('[')[0]}</p>
                
                <div className="news-meta">
                    <ul>
                        {item.author && <li>Curated By: <span>{item.author}</span></li>}
                        <li><span>{item.source.name}</span></li>
                        <li>Last Updated: <span className='date'>{formatDate(item.publishedAt)}</span></li>
                        <li>
                            <a href={item.url} target='_blank' rel='noreferrer'>
                                Read More
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NewsBox;
