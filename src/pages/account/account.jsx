import React, { useContext} from 'react';
import './account.style.scss';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../../lib/utils/firebase.utils';
import { UserContext } from '../../context/user-context';
import Button from '../../components/button/button.component';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import NewsBoxAccountPage from '../../components/news-box-account-page/news-box-account-page.component';

function AccountPage() {
    const navigate = useNavigate();

    const { userDoc, setUserDoc, userBookmarks } = useContext(UserContext);

    const signOutHandler = async () => {
        await signOutUser();
        setUserDoc({})
        navigate('/accounts');
    }

    const goToUpdateProfilePage =() => {
        navigate('/account/update');
    }

    return (
        <div className='account-page-container'>
            <div className="account-container">
                <div className="account">
                    <div className="profile-image-container">
                        <img src={userDoc?.photoURL} alt="" />
                    </div>

                    <div className="user-info">
                        <h1 className='user-name'>
                            {userDoc?.displayName}
                        </h1>

                        <ul>
                            <li>
                                <h2>Username</h2>
                                <p>{userDoc?.username}</p>
                            </li>
                            <li>
                                <h2>Phone</h2>
                                <p>{userDoc?.phoneNumber}</p>
                            </li>
                            <li>
                                <h2>Email</h2>
                                <p>{userDoc?.email}</p>
                            </li>
                        </ul>
                    </div>

                    <Button 
                        buttonText='Update Profile' 
                        buttonType='simple' 
                        onClick={goToUpdateProfilePage} 
                    />

                    <Button 
                        buttonType='icon' 
                        onClick={goToUpdateProfilePage} 
                        icon={faPencil} 
                    />
                </div>

                <div className="buttons-container">
                    <Button 
                        type='button' 
                        buttonText='Sign Out' 
                        onClick={signOutHandler} 
                    />
                </div>
            </div>

            <div className="user-bookmarks">
                <h1>Bookmarks</h1>

                {userBookmarks.length ? 
                    <div className="bookmarks-list">
                        {userBookmarks.map((item, index) => {
                            return (
                                <NewsBoxAccountPage 
                                    key={index} 
                                    item={item} 
                                />
                            )
                        })}
                    </div> : 
                    <div className='no-bookmarks'>
                        <h1>No Bookmarks yet!</h1>
                    </div>
                }
            </div>
        </div>
    )
}

export default AccountPage;
