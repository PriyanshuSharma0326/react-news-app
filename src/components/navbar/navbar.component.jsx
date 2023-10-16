import React, { useContext, useEffect } from 'react';
import './navbar.style.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCateredNews } from '../../features/cateredNewsSlice';
import { UserContext } from '../../context/user-context';

function Navbar() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const location = useLocation();

    const { currentUser, userDoc } = useContext(UserContext);

    const goToNewsPage = () => {
        navigate('/news');
    }

    const goToCategoryPage = (searchString) => {
        navigate(`/news/${searchString}`);
    }

    useEffect(() => {
        const topicsBar = document.getElementById('topics-bar');

        currentUser && topicsBar.childNodes.forEach((node, index) => {
            if (index > 0) {
                dispatch(fetchCateredNews(node.innerText));
            }
        });
    }, [dispatch, currentUser]);

    return (
        <div className='navbar-container'>
            <nav className='navbar'>
                <Link 
                    to='/' 
                    className='nav-link' 
                >
                    <img className='nav-logo' src="https://brandlogos.net/wp-content/uploads/2022/09/autodesk_revit-logo_brandlogos.net_4hpe4-512x512.png" alt="Logo" />
                    <h1 className='nav-title'>ReactReporter</h1>
                </Link>

                {currentUser && <ul className="nav-links-container">
                    <li>
                        <Link 
                            to='/account/bookmarks' 
                            className='nav-link' 
                        >
                            Bookmarks
                        </Link>
                    </li>

                    <li>
                        <Link 
                            to='/account' 
                            className='nav-link user-link' 
                        >
                            <img src={userDoc?.photoURL} alt={userDoc?.displayName} />
                            <span>{userDoc?.username}</span>
                        </Link>
                    </li>
                </ul>}
            </nav>

            {currentUser && <div className="topics-bar" id='topics-bar'>
                <span className={`topic${location.pathname === '/news' ? ' active' : ''}`} onClick={goToNewsPage}>Latest</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Movies' ? ' active' : ''}`} onClick={() => goToCategoryPage('Movies')}>Movies</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Cricket' ? ' active' : ''}`} onClick={() => goToCategoryPage('Cricket')}>Cricket</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Football' ? ' active' : ''}`} onClick={() => goToCategoryPage('Football')}>Football</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Health' ? ' active' : ''}`} onClick={() => goToCategoryPage('Health')}>Health</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Business' ? ' active' : ''}`} onClick={() => goToCategoryPage('Business')}>Business</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Sports' ? ' active' : ''}`} onClick={() => goToCategoryPage('Sports')}>Sports</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Elections' ? ' active' : ''}`} onClick={() => goToCategoryPage('Elections')}>Elections</span>
            </div>}
        </div>
    )
}

export default Navbar;
