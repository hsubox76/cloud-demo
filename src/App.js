import React, { Component } from 'react';
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
          this is where the header was
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
