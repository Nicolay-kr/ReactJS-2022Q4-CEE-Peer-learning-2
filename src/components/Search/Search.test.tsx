import React from 'react';
import { fireEvent, screen, render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Search } from './Search';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
 useNavigate: () => mockedNavigate,
}));

describe('Search Component', () => {

  it('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call useNavigate when submit button was click', async () => {
    const value = 'testValue';
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </MemoryRouter>
    );

    const button = screen.getByText('Search');

    await act(async() => await userEvent.click(button));

    expect(mockedNavigate).toHaveBeenCalled();
  });
});
