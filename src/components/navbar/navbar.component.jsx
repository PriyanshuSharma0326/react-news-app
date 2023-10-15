import React from 'react';
import './navbar.style.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCateredNews } from '../../features/cateredNewsSlice';
// import { UserContext } from '../../context/user-context';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons'
// import { CartContext } from '../../context/cart-context';
// import CartDropdown from '../cart-dropdown/cart-dropdown.component';
// import { NavbarContext } from '../../context/navbar-context';
// import NavigationMenu from '../navigation-menu/navigation-menu.component';

function Navbar() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const location = useLocation();

    const goToNewsPage = () => {
        navigate('/news');
    }

    const dispatchNewsData = (searchString) => {
        navigate(`/news/${searchString}`);
        dispatch(fetchCateredNews(searchString));
    }

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

                <ul className="nav-links-container">
                    <li>
                        <Link 
                            to='/news' 
                            className='nav-link' 
                        >
                            Latest News
                        </Link>
                    </li>
                </ul>

                {/* <div className="more-icon-container" onClick={displayMenu}>
                    <FontAwesomeIcon className='icon' icon={faBars} />
                </div> */}
            </nav>

            <div className="topics-bar">
                <span className={`topic${location.pathname === '/news' ? ' active' : ''}`} onClick={goToNewsPage}>Latest</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Movies' ? ' active' : ''}`} onClick={() => dispatchNewsData('Movies')}>Movies</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Cricket' ? ' active' : ''}`} onClick={() => dispatchNewsData('Cricket')}>Cricket</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Health' ? ' active' : ''}`} onClick={() => dispatchNewsData('Health')}>Health</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Business' ? ' active' : ''}`} onClick={() => dispatchNewsData('Business')}>Business</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Education' ? ' active' : ''}`} onClick={() => dispatchNewsData('Education')}>Education</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Sports' ? ' active' : ''}`} onClick={() => dispatchNewsData('Sports')}>Sports</span>
                <span className={`topic${location.pathname.split('/news/')[1] === 'Elections' ? ' active' : ''}`} onClick={() => dispatchNewsData('Elections')}>Elections</span>
            </div>
        </div>
    )
}

export default Navbar;
