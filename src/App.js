import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import HomePage from './components/homepage/HomePage';
import './css/style.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="display-flex align-items-center justify-center">
          <div className="main display-flex justify-center">
            <Route exact path="/" component={HomePage} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;