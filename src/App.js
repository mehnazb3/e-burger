import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder/>
      </Layout>
    );
  }
}

export default App;
