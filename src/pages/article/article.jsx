import React, { useContext, useState } from 'react';
import './article.style.scss';
import { useParams } from 'react-router-dom';
import { CompiledNewsContext } from '../../context/compiled-news.context';
import { UserContext } from '../../context/user-context';
import { formatDate } from '../../lib/utils/utils';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { addArticleToBookmarks, removeArticleFromBookmarks } from '../../lib/utils/firebase.utils';

function Article() {
    const param = useParams();

    const [imageError, setImageError] = useState(false);

    const { compiledNews } = useContext(CompiledNewsContext);

    const { currentUser, userBookmarks } = useContext(UserContext);

    const thisNews = compiledNews.find(item => item.title.trim().split('?').join('').split('%').join('') === param['*']);

    const handleAddArticleToBookmarks = async () => {
        await addArticleToBookmarks(
            {
                ...thisNews,
                ...(thisNews.content ? { content: thisNews.content.split('[')[0] } : {})
            },
            currentUser?.uid
        );
    }

    const handleRemoveArticleFromBookmarks = async () => {
        await removeArticleFromBookmarks(
            {
                ...thisNews,
                ...(thisNews.content ? { content: thisNews.content.split('[')[0] } : {})
            },
            currentUser?.uid
        )
    }

    return (
        <div className='article-page-container'>
            <div className="article-header">
                <div className="article-info">
                    <h1 className='article-title'>{thisNews?.title}</h1>

                    <div className="article-meta">
                        <ul>
                            {thisNews?.author && <li className='author'>Curated By: <span>{thisNews?.author}</span></li>}
                            <li><span>{thisNews?.source.name}</span></li>
                            <li>Last Updated: <span className='date'>{formatDate(thisNews?.publishedAt)}</span></li>
                        </ul>

                        <div className="bookmark-container">
                            {userBookmarks.some(obj => obj.title === thisNews.title) ? 
                                <BookmarkIcon 
                                    className='marked'
                                    onClick={handleRemoveArticleFromBookmarks} 
                                /> : 
                                <BookmarkBorderOutlinedIcon 
                                    onClick={handleAddArticleToBookmarks} 
                                />
                            }
                        </div>
                    </div>
                </div>

                <div className="bookmark-container">
                    {userBookmarks.some(obj => obj.title === thisNews.title) ? 
                        <BookmarkIcon 
                            className='marked'
                            onClick={handleRemoveArticleFromBookmarks} 
                        /> : 
                        <BookmarkBorderOutlinedIcon 
                            onClick={handleAddArticleToBookmarks} 
                        />
                    }
                </div>
            </div>

            <div className="article-image-container">
                {
                    !imageError ? 
                    <img 
                        src={thisNews?.urlToImage} 
                        alt="" 
                        onError={() => setImageError(true)}  
                    /> : 
                    <img 
                        src="https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_limit,w_576/s3/2/50552/image%20not%20available(34).jpg" 
                        alt="" 
                    />
                }
            </div>

            <h2 className='article-description'>{thisNews?.description}</h2>

            <p className="article-content">
                {thisNews?.content?.split('[')[0]} <a href={thisNews?.url} target='_blank' rel='noreferrer'>Read Full article here</a>
            </p>
        </div>
    )
}

export default Article;
