import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SharedLayout from './routes/shared-layout/shared-layout';
import Root from './routes/root/root.route';
import Error from './routes/error/error.route';
import { useDispatch } from 'react-redux';
import { fetchNews } from './features/newsSlice';
import NewsAndTopics from './routes/topics/news-and-topics.route';
import { fetchLatestNews } from './features/latestNewsSlice';
import { UserContext } from './context/user-context';
import Auth from './routes/auth/authentication.route';
import SignIn from './pages/signin/signin';
import SignUp from './pages/signup/signup';
import Account from './routes/account/account.route';

function App() {
    const dispatch = useDispatch();

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        dispatch(fetchNews());
        dispatch(fetchLatestNews());
    }, [dispatch]);

    const ProtectedRouteNoLogin = ({ children }) => {
        if(!currentUser) {
            return <Navigate to="/accounts/login" />;
        }
    
        return children;
    };

    const ProtectedRouteOnLogin = ({ children }) => {
        if(currentUser) {
            return <Navigate to="/" />;
        }

        return children;
    };

    return (
        <Routes>
            <Route path='/' element={<SharedLayout />}>
                <Route index element={
                    <ProtectedRouteNoLogin>
                        <Root />
                    </ProtectedRouteNoLogin>
                } />

                <Route path='news/*' element={
                    <ProtectedRouteNoLogin>
                        <NewsAndTopics />
                    </ProtectedRouteNoLogin>
                } />

                <Route path='accounts' element={
                    <ProtectedRouteOnLogin>
                        <Auth />
                    </ProtectedRouteOnLogin>
                }>
                    <Route index element={<SignIn />} />

                    <Route path='login' element={<SignIn />} />

                    <Route path='register' element={<SignUp />} />
                </Route>

                <Route path='account/*' element={
                    <ProtectedRouteNoLogin>
                        <Account />
                    </ProtectedRouteNoLogin>
                } />

                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    )
}

export default App;
