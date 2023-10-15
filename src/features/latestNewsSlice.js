import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialStateValue = {
    news: [],
    loading: 'idle',
    error: null,
};

const fetchLatestNews = createAsyncThunk('latestNews/fetchLatestNews', async () => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
        return response.data.articles;
    } catch (error) {
        throw error;
    }
});

const latestNewsSlice = createSlice({
    name: 'latestNews',
    initialState: initialStateValue,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchLatestNews.pending, (state) => {
            state.loading = 'loading';
        })
        .addCase(fetchLatestNews.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.news = action.payload;
        })
        .addCase(fetchLatestNews.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
    },
});

export default latestNewsSlice.reducer;

export { fetchLatestNews };
