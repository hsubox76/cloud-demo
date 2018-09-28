import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// List of enemies - hardcoded
const enemies = [
  'cat',
  'dog',
  'baby'
  ];

class App extends Component {
  constructor() {
    super();
    this.state = {
      enemies // init from const above
    };
  }
  // remove from list
  removeEnemy = (enemyToRemove) => {
    this.setState({ enemies: this.state.enemies.filter(enemy => enemy !== enemyToRemove)});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="enemies-list">
          {/* checklist */}
          {this.state.enemies.map(enemy => (
            <div key={enemy}>
              {/* remove on click */}
              <input onClick={() => this.removeEnemy(enemy)} type="checkbox" />
              <label>{enemy}</label>
            </div>
          ))}
        </p>
      </div>
    );
  }
}

export default App;
