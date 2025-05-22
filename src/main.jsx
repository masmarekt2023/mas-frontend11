import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18n from './i18n/i18n'; // Import your i18n configuration
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CssBaseline from '@mui/material/CssBaseline';
// third party
import reducer from './views/pages/Dashboard/store/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import '../public/assets/scss/style.scss';

const container = document.getElementById('root');
const store = configureStore({ reducer });

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline />
    {/* Wrap your app with I18nextProvider */}
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false} // Set rtl dynamically based on the current language
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();