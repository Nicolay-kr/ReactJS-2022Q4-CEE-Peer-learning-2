import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/search',
    element: <App />,
  },
  {
    path: '/search/:searchQuery',
    element: <App />,
  },
  {
    path: '/',
    element: <Navigate replace to='/search' />,
  },
  {
    path: '*',
    element: <h1> 404 page</h1>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
