import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from './routes/shared-layout/shared-layout';
import Root from './routes/root/root.route';
import Error from './routes/error/error.route';

function App() {
    const url = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=54780f5aab7c4df9a8ba208fbbc0b17d';

    const [news, setNews] = useState('');

    const generateAdvice = async () => {
        try {
            await fetch(url).then(res => {
                return res.json();
            }).then((data) => {
                console.log(data.articles[0].content);
                setNews(data.articles[0].content?.split('[')[0])
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    generateAdvice();

    return (
        <Routes>
            <Route path='/' element={<SharedLayout />}>
                <Route index element={<Root />} />

                {/* <Route path='shop/*' element={<Shop />} /> */}

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
