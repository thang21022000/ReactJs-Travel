import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {AuthProvider} from './components/AuthContext'

ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>
,document.getElementById('root'));

