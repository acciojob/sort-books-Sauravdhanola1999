import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './components/features/booksSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});

export default store;
