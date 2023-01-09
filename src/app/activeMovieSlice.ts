import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Movie } from '../types/movie';

export interface activeMovie {
  activeMovie: Movie | null;
  success: boolean;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: activeMovie = {
  activeMovie: null,
  status: 'idle',
  success: false,
};

export const getMovieByIdAsync = createAsyncThunk(
  'activeMovie/getMovieByIdAsync',
  async (id: string | number) => {
    const response = await fetch(`http://localhost:4000/movies/${id}`);
    const json = await response.json();
    return json;
  }
);

export const activeMovieSlice = createSlice({
  name: 'activeMovie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovieByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovieByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.activeMovie = action.payload;
        state.success = true;
      })
      .addCase(getMovieByIdAsync.rejected, (state) => {
        state.status = 'failed';
        state.success = false;
      });
  },
});


export default activeMovieSlice.reducer;
