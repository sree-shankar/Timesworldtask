import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountries = createAsyncThunk('countries/fetch', async () => {
  const res = await axios.get('https://restcountries.com/v2/all?fields=name,region,flag');
  return res.data;
});

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    all: [],
    filtered: [],
    region: 'All',
    visibleCount: 6,
        loading: false,

  },
  reducers: {
    filterByRegion: (state, action) => {
      state.region = action.payload;
      state.filtered = action.payload === 'All'
        ? state.all
        : state.all.filter(country => country.region === action.payload);
      state.visibleCount = 6;
    },
    loadMore: (state) => {
      state.visibleCount += 6;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchCountries.fulfilled, (state, action) => {
    //   state.all = action.payload;
    //   state.filtered = action.payload;
    // });

       builder
            .addCase(fetchCountries.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.loading = false;
                state.all = action.payload;
                state.filtered = action.payload;
            })
            .addCase(fetchCountries.rejected, (state) => {
                state.loading = false;
            });
  },
});

export const { filterByRegion, loadMore } = countriesSlice.actions;
export default countriesSlice.reducer;
