import React, { Component } from 'react';
import logo from './logo.svg';
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
      enemies: enemies,
      userInput: ''
    }
  }
  addEnemy = (enemyToAdd) => {
    this.setState({
      enemies: this.state.enemies.concat(enemyToAdd),
      userInput: ''
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
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="add-enemy-form">
          <input value={this.state.userInput} onChange={(e) => this.setState({ userInput: e.target.value })} />
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
