import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async () => {
    const response = await axios.get('https://api.nytimes.com/svc/books/v3/lists.json?api-key=YOUR_API_KEY');
    return response.data.results.books;
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: false,
    error: null,
    sortBy: 'title', // Default sorting
    sortOrder: 'asc', // Default order
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    sortBooks: (state) => {
      state.books = state.books.sort((a, b) => {
        const fieldA = a[state.sortBy].toLowerCase();
        const fieldB = b[state.sortBy].toLowerCase();

        if (state.sortOrder === 'asc') {
          return fieldA.localeCompare(fieldB);
        } else {
          return fieldB.localeCompare(fieldA);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSortBy, setSortOrder, sortBooks } = booksSlice.actions;

export default booksSlice.reducer;
