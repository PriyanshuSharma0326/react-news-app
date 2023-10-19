import React, { useContext, useState } from 'react';
import './news-box-account-page.style.scss';
import { formatDate } from '../../lib/utils/utils';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { UserContext } from '../../context/user-context';
import { addArticleToBookmarks, removeArticleFromBookmarks } from '../../lib/utils/firebase.utils';

function NewsBoxAccountPage({ item }) {
    const { currentUser, userBookmarks } = useContext(UserContext);

    const [imageError, setImageError] = useState(false);

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
        <div className='news-box-account-page'>
            <a href={item.url} target='_blank' rel='noreferrer'>
                {
                    !imageError ? 
                    <img 
                        src={item?.urlToImage} 
                        alt="" 
                        onError={() => setImageError(true)}  
                    /> : 
                    <img 
                        src="https://resource.rentcafe.com/image/upload/q_auto,f_auto,c_limit,w_576/s3/2/50552/image%20not%20available(34).jpg" 
                        alt="" 
                    />
                }
            </a>
            <div className="news-content">
                <a href={item.url} target='_blank' rel='noreferrer'>
                    {item.title}
                </a>
                
                <div className="news-meta">
                    <ul>
                        {item.author && <li className='author'>Curated By: <span>{item.author}</span></li>}
                        <li className='last-update'>Last Updated: <span className='date'>{formatDate(item.publishedAt)}</span></li>
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

export default NewsBoxAccountPage;
