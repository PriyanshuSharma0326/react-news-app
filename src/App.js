import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from './routes/shared-layout/shared-layout';
import Root from './routes/root/root.route';
import Error from './routes/error/error.route';
import { useDispatch } from 'react-redux';
import { fetchNews } from './features/newsSlice';
import NewsAndTopics from './routes/topics/news-and-topics.route';
import { fetchLatestNews } from './features/latestNewsSlice';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNews());
        dispatch(fetchLatestNews());
    }, [dispatch]);

    return (
        <Routes>
            <Route path='/' element={<SharedLayout />}>
                <Route index element={<Root />} />

                <Route path='news/*' element={<NewsAndTopics />} />

                {/* <Route path='accounts' element={
                    <ProtectedRouteOnLogin>
                        <AuthPage />
                    </ProtectedRouteOnLogin>
                }>
                    <Route index element={<SignIn />} />

                    <Route path='login' element={<SignIn />} />

                    <Route path='register' element={<SignUp />} />
                </Route> */}

                {/* <Route path='account/*' element={
                    <ProtectedRouteNoLogin>
                        <Account />
                    </ProtectedRouteNoLogin>
                } /> */}

                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    )
}

export default App;
