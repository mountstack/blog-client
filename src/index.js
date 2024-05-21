import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/index';

// const token = localStorage.getItem('token');

// if (token) { 
//   axios.defaults.headers.common['Authorization'] = token; 
// } 
// else { 
//   axios.defaults.headers.common['Authorization'] = ''; 
// } 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
