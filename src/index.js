import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import moment from 'moment'

const DATA = [
  { id: "0", name: "Eat", timestamp: moment().subtract(6, 'days') },
  { id: "1", name: "Sleep", timestamp: moment() },
  { id: "2", name: "Pawn", timestamp: moment().subtract(28, 'days') },
  { id: "3", name: "Repeat", timestamp: moment().add(1, 'days') } //testing purpose + 1 day
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>
);



