import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { Movie } from '../types/movie';
import { HIDE_LOADER, SHOW_LOADER } from './types';
import {filterMoviesAsync} from './slices/filterMoviesAsync';


export interface MovieList {
  moviesList: Movie[];
  activeMovie: Movie | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MovieList = {
  moviesList: [],
  activeMovie: null,
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getAllMoviesAsync = createAsyncThunk(
  'movies/getAllMoviesAsync',
  async () => {
    const response = await fetch(
      'http://localhost:4000/movies?searchBy=title&limit=9'
    );
    const json = await response.json();
    // The value we return becomes the `fulfilled` action payload
    return json.data;
  }
);

export const getMovieByIdAsync = createAsyncThunk(
  'movies/getMovieByIdAsync',
  async (id: string | number) => {
    const response = await fetch(`http://localhost:4000/movies/${id}`);
    const json = await response.json();
    return json;
  }
);

export const searchMoviesByTitleAsync = createAsyncThunk(
  'movies/searchMoviesByTitleAsync',
  async (param: string) => {
    const [title, sortBy, genre] = param.split(',');
    let response;
    if (genre === 'all') {
      response = await fetch(
        `http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=desc&search=${title.toLowerCase()}&searchBy=title&limit=9`
      );
    } else {
      response = await fetch(
        `http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=desc&search=${title.toLowerCase()}&searchBy=title&filter=${genre}&limit=9`
      );
    }
    const json = await response.json();
    return json;
  }
);

export const removeMovieByIdAsync = createAsyncThunk(
  'movies/removeMovieByIdAsync',
  async (id: string | number) => {
    const response = await fetch(`http://localhost:4000/movies/${id}`, {
      method: 'DELETE',
    });
    const json = await response.json();
    console.log(`movie with id ${id} is removed `);
    return json;
  }
);

export const filterAllMoviesAsync = createAsyncThunk(
  'movies/filterAllMoviesAsync',
  async (param: string) => {
    const [sortBy, genre] = param.split(',');
    let response;
    if (genre === 'all') {
      response = await fetch(
        `http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=desc&limit=9`
      );
    } else {
      response = await fetch(
        `http://localhost:4000/movies?sortBy=${sortBy}&sortOrder=desc&filter=${genre}&limit=9`
      );
    }

    const json = await response.json();
    return json.data;
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    showLoader: (): any => {
      return {
        type: SHOW_LOADER,
      };
    },
    hideLoader: (): any => {
      return {
        type: HIDE_LOADER,
      };
    },
    fetchMovies: (): any => {},

    // increment: (state) => {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getAllMoviesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllMoviesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.moviesList = action.payload;
      })
      .addCase(getAllMoviesAsync.rejected, (state) => {
        state.status = 'failed';
      });

    builder
      .addCase(getMovieByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovieByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.activeMovie = action.payload;
      })
      .addCase(getMovieByIdAsync.rejected, (state) => {
        state.status = 'failed';
      });
    builder
      .addCase(removeMovieByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeMovieByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.moviesList = state.moviesList.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(removeMovieByIdAsync.rejected, (state) => {
        state.status = 'failed';
      });
    builder
      .addCase(searchMoviesByTitleAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMoviesByTitleAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.moviesList = action.payload.data;
      })
      .addCase(searchMoviesByTitleAsync.rejected, (state) => {
        state.status = 'failed';
      });
    builder
      .addCase(filterAllMoviesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterAllMoviesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.moviesList = action.payload;
      })
      .addCase(filterAllMoviesAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { showLoader, hideLoader } = moviesSlice.actions;

export const selectMovies = (state: RootState) => state.movies;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default moviesSlice.reducer;
