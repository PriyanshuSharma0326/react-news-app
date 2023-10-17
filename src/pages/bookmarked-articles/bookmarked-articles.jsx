import React, { useContext } from 'react';
import './bookmarked-articles.style.scss';
import { UserContext } from '../../context/user-context';
import NewsBox from '../../components/news-box/news-box.component';

function BookmarkedArticles() {
    const { userBookmarks } = useContext(UserContext);

    return (
        <div className='bookmarked-articles-page-container'>
            <div className="bookmarked-articles-container">
                <h1 className='title'>Saved Articles</h1>
                {
                    userBookmarks.length ? 
                    userBookmarks.map((item, index) => {
                        return (
                            <NewsBox 
                                key={index} 
                                item={item} 
                            />
                        )
                    }) : 
                    <div className='no-bookmarks'>
                        <h1>No Bookmarks yet!</h1>
                    </div>
                }
            </div>
        </div>
    )
}

export default BookmarkedArticles;
