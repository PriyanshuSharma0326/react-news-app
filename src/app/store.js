import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/newsSlice';
import latestNewsReducer from '../features/latestNewsSlice';
import cateredNewsReducer from '../features/cateredNewsSlice';

export const store = configureStore({
    reducer: {
        news: newsReducer,
        latestNews: latestNewsReducer,
        cateredNews: cateredNewsReducer,
    },
});
