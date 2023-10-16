import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './style/index.scss';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { UserContextProvider } from './context/user-context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <UserContextProvider>
            <Provider store={ store }>
                <Router>
                    <App />
                </Router>
            </Provider>
        </UserContextProvider>
    </React.StrictMode>
);
