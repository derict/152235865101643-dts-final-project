import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import '@tabler/core/dist/css/tabler.css'

import App from './App';
import Login from './container/Login';

import reportWebVitals from './reportWebVitals';
import ProtectedRoute from './component/ProtectedRoute';
import Register from './container/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='login' element=
          {
            <ProtectedRoute loginOnly={false}>
              <Login />
            </ProtectedRoute>
          } 
        />
        <Route path='register' element=
          {
            <ProtectedRoute loginOnly={false}>
              <Register />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
