import React from 'react';
import './App.scss';
import {BrowserRouter} from "react-router-dom"
import Router from './Router';
import Header from './components/Header';

function App() {
  return (
  <BrowserRouter>
    <Header></Header>
    <Router></Router>
  </BrowserRouter>
  );
}

export default App;
