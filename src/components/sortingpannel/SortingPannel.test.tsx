import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SortingPannel from './SortingPannel';
import { store } from '../../app/store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

describe('SortingPannel', () => {

  test('shoud be rendered', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <SortingPannel />
      </Provider>
    );
    const firstRender = asFragment();

    expect(firstRender).toMatchSnapshot();
  });


  test('sorting button should be at document', () => {
    render(
      <Provider store={store}>
        <SortingPannel></SortingPannel>
      </Provider>
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  test('sorting menu should be openeed if  the sorting button was preseed', async () => {
    const { asFragment } = render(
      <Provider store={store}>
        <SortingPannel></SortingPannel>
      </Provider>
    );
    const element = screen.getByTestId('sortingMenu');

    expect(screen.queryByTestId('sortingMenuConteiner')).toBeNull();
    await userEvent.click(element)
    expect(screen.getByTestId('sortingMenuConteiner')).toBeInTheDocument();
  });

  // test('shoud change genre', async () => {
  //   render(
  //     <Provider store={store}>
  //       <SortingPannel></SortingPannel>
  //     </Provider>
  //   );
  //   const element = screen.queryByTestId('Documentary');

  //   if(element){
  //     await userEvent.click(element)
  //   }

  //   expect().toHaveBeenCalledTimes(1);
  // });
});
