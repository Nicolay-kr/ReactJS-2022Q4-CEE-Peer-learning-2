import activeMovieReducer, {
  activeMovie,
  getMovieByIdAsync,
} from './activeMovieSlice';

describe('activeMovie', () => {
  const initialState: activeMovie = {
    activeMovie: null,
    status: 'idle',
    success: false,
  };

  const mockMovie = {
    id: 1,
    title: 'Pulp Fiction',
    release_date: 2004,
    genres: ['Action & Adventure'],
    poster_path: 'some_path',
    vote_average: 7.9,
    runtime: 165544561,
    overview: `Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra`,
  };

  it('should return the initial state', () => {
    const state = activeMovieReducer(undefined, {
      type: undefined,
    });
    expect(state).toEqual(initialState);
  });

  it('sets status loading when getMovieByIdAsync is pending', () => {
    const action = { type: getMovieByIdAsync.pending.type };
    const state = activeMovieReducer(initialState, action);
    expect(state).toEqual({
      status: 'loading',
      success: false,
      activeMovie: null,
    });
  });

  it('sets status and success false when getMovieByIdAsync is rejected', () => {
    const action = {
      type: getMovieByIdAsync.rejected.type,
      payload: { error: 'some error' },
    };
    const state = activeMovieReducer(initialState, action);
    expect(state).toEqual({
      status: 'failed',
      success: false,
      activeMovie: null,
    });
  });

  it("sets success true and status: 'idle' when getMovieByIdAsync is fulfilled", () => {
    const action = {
      type: getMovieByIdAsync.fulfilled.type,
      payload: mockMovie,
    };
    const state = activeMovieReducer(initialState, action);
    expect(state).toEqual({
      status: 'idle',
      success: true,
      activeMovie:mockMovie,
    });
  });
});
