import React, { Component } from 'react';
import './App.css';

const enemies = [
  'cat',
  'dog',
  'baby'
  ];

class App extends Component {
  constructor() {
    super();
    this.state = {
      enemies,
      userInput: '' // controlled input
    }
  }
  // add a new enemy
  addEnemy = (enemyToAdd) => {
    this.setState({
      enemies: this.state.enemies.concat(enemyToAdd), // add to state
      userInput: '' // clear input field
    });
  }
  removeEnemy = (enemyToRemove) => {
    this.setState({
      enemies: this.state.enemies.filter(enemy => enemy !== enemyToRemove)
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          this is where the header was
        </header>
        {/* Form for adding a new enemy */}
        <div className="add-enemy-form">
          {/* The controlled input */}
          <input value={this.state.userInput} onChange={(e) => this.setState({ userInput: e.target.value })} />
          {/* Add on click */}
          <button onClick={() => this.addEnemy(this.state.userInput)}>add enemy</button>
        </div>
        <div className="enemies-list">
          {this.state.enemies.map(enemy => (
            <div key={enemy}>
              <input type="checkbox" onClick={() => this.removeEnemy(enemy)} />
              <label>{enemy}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
