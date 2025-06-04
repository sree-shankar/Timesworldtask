import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from '../Slices/CountriesSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
});