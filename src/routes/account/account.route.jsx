import React from 'react'
import AccountPage from '../../pages/account/account';
import { Route, Routes } from 'react-router-dom';
import UpdateProfile from '../../pages/update-profile/update-profile';
import BookmarkedArticles from '../../pages/bookmarked-articles/bookmarked-articles';

function Account() {
    return (
        <Routes>
            <Route 
                index 
                element={
                    <AccountPage />
                }
            />

            <Route 
                path='update' 
                element={<UpdateProfile />} 
            />

            <Route 
                path='bookmarks' 
                element={<BookmarkedArticles />} 
            />
        </Routes>
    )
}

export default Account;
