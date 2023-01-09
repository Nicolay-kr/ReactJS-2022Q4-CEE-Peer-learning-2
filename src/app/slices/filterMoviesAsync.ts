import { createAsyncThunk } from '@reduxjs/toolkit';


export const filterMoviesAsync = createAsyncThunk(
  'movies/filterMoviesAsync',
  async (genre: string) => {
    const response = await fetch(
      `http://localhost:4000/movies?searchBy=genres&filter=${genre}&limit=9`
    );
    const json = await response.json();
    return json.data;
  }
);
