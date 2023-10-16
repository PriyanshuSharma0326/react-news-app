import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/newsSlice';
import cateredNewsReducer from '../features/cateredNewsSlice';

export const store = configureStore({
    reducer: {
        news: newsReducer,
        cateredNews: cateredNewsReducer,
    },
});
