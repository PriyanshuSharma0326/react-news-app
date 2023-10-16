import React, { useContext } from 'react';
import './news-box.style.scss';
import { formatDate } from '../../lib/utils/utils';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { UserContext } from '../../context/user-context';
import { addArticleToBookmarks, removeArticleFromBookmarks } from '../../lib/utils/firebase.utils';

function NewsBox({ item }) {
    const { currentUser, userBookmarks } = useContext(UserContext);

    const handleAddArticleToBookmarks = async () => {
        await addArticleToBookmarks(
            {
                ...item,
                ...(item.content ? { content: item.content.split('[')[0] } : {})
            },
            currentUser?.uid
        );
    }

    const handleRemoveArticleFromBookmarks = async () => {
        await removeArticleFromBookmarks(
            {
                ...item,
                ...(item.content ? { content: item.content.split('[')[0] } : {})
            },
            currentUser?.uid
        )
    } 

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
                {item.content && <p>{item.content?.split('[')[0]}</p>}
                
                <div className="news-meta">
                    <ul>
                        {item.author && <li className='author'>Curated By: <span>{item.author}</span></li>}
                        <li><span>{item.source.name}</span></li>
                        <li>Last Updated: <span className='date'>{formatDate(item.publishedAt)}</span></li>
                        <li>
                            <a href={item.url} target='_blank' rel='noreferrer'>
                                Read More
                            </a>
                        </li>
                    </ul>

                    <div className="bookmark-container">
                        {userBookmarks.some(obj => obj.title === item.title) ? 
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
                {userBookmarks.some(obj => obj.title === item.title) ? 
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
    )
}

export default NewsBox;
