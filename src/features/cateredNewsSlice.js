import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialStateValue = {
    news: {},
    loading: 'idle',
    error: null,
};

const fetchCateredNews = createAsyncThunk('news/fetchCateredNews', async (searchString) => {
    try {
        const response = await axios.get(`https://saurav.tech/NewsAPI/top-headlines/category/${searchString.toLowerCase()}/in.json`);
        return { [searchString]: response.data.articles.slice(0, 60) };
    } catch (error) {
        throw error;
    }
});

const cateredNewsSlice = createSlice({
    name: 'cateredNews',
    initialState: initialStateValue,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCateredNews.pending, (state) => {
            state.loading = 'loading';
        })
        .addCase(fetchCateredNews.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.news = { ...state.news, ...action.payload};
        })
        .addCase(fetchCateredNews.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.error.message;
        });
    },
});

export default cateredNewsSlice.reducer;

export { fetchCateredNews };
