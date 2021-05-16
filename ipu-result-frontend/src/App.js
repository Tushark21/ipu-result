import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ResultCard from './components/ResultCard';
import React from 'react';
import {BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import Home from './components/Home';
import { createBrowserHistory } from 'history';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.history=createBrowserHistory();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Switch>
            <Route path="/" exact component={Home} history={this.history} />
            <Route path="/report" component={ResultCard} />
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
