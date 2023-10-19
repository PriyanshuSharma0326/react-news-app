import React, { useContext } from 'react';
import './article.style.scss';
import { useParams } from 'react-router-dom';
import { CompiledNewsContext } from '../../context/compiled-news.context';
import { UserContext } from '../../context/user-context';
import { formatDate } from '../../lib/utils/utils';

function Article() {
    const param = useParams();

    const { compiledNews } = useContext(CompiledNewsContext);

    const { userBookmarks } = useContext(UserContext);

    const thisNews = compiledNews.find(item => item.title.trim() === param['*']);

    return (
        <div className='article-page-container'>
            <h1 className='article-title'>{thisNews?.title}</h1>

            <div className="article-meta">
                <ul>
                    {thisNews?.author && <li className='author'>Curated By: <span>{thisNews?.author}</span></li>}
                    <li><span>{thisNews?.source.name}</span></li>
                    <li>Last Updated: <span className='date'>{formatDate(thisNews?.publishedAt)}</span></li>
                </ul>

                {/* <div className="bookmark-container">
                    {userBookmarks.some(obj => obj.title === thisNews.title) ? 
                        <BookmarkIcon 
                            className='marked'
                            onClick={handleRemoveArticleFromBookmarks} 
                        /> : 
                        <BookmarkBorderOutlinedIcon 
                            onClick={handleAddArticleToBookmarks} 
                        />
                    }
                </div> */}
            </div>

            <div className="article-image-container">
                <img src={thisNews?.urlToImage} alt="" />
            </div>

            <h2 className='article-description'>{thisNews?.description}</h2>

            <p className="article-content">
                {thisNews?.content?.split('[')[0]} <a href={thisNews?.url} target='_blank' rel='noreferrer'>Read Full article here</a>
            </p>
        </div>
    )
}

export default Article;
